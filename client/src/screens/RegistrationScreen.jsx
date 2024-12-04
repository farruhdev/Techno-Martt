import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	HStack,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useToast,
	List,
	ListItem,
	ListIcon,
} from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { googleLogin, register } from '../redux/actions/userActions';

const RegistrationScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const redirect = '/products';
	const toast = useToast();
	const { loading, error, userInfo } = useSelector((state) => state.user);
	const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	const [passwordRequirements, setPasswordRequirements] = useState({
		minLength: false,
		hasNumber: false,
		hasUppercase: false,
		hasSymbol: false,
	});

	const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

	const checkPasswordRequirements = (password) => {
		setPasswordRequirements({
			minLength: password.length >= 6,
			hasNumber: /\d/.test(password),
			// Обновленная проверка на заглавные буквы для поддержки кириллицы
			hasUppercase: /[A-ZА-ЯЁ]/.test(password),
			hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		});
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({
				description: userInfo.firstLogin ? 'Аккаунт создан. Добро пожаловать!' : `С возвращением, ${userInfo.name}!`,
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, toast]);

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
			validationSchema={Yup.object({
				name: Yup.string().required('Имя обязательно для заполнения.'),
				email: Yup.string()
					.email('Введите действительный адрес электронной почты.')
					.required('Адрес электронной почты обязателен.'),
				password: Yup.string()
					.required('Пароль обязателен для заполнения.')
					.min(6, 'Пароль должен содержать не менее 6 символов.')
					.matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру.')
					// Обновленная валидация для поддержки кириллицы
					.matches(/[A-ZА-ЯЁ]/, 'Пароль должен содержать хотя бы одну заглавную букву.')
					.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Пароль должен содержать хотя бы один специальный символ.'),
				confirmPassword: Yup.string()
					.required('Подтвердите ваш пароль.')
					.oneOf([Yup.ref('password'), null], 'Пароли должны совпадать.'),
			})}
			validateOnBlur={true}
			validateOnChange={false}
			onSubmit={(values) => {
				dispatch(register(values.name, values.email, values.password));
			}}
		>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Создайте аккаунт</Heading>
								<HStack spacing='1' justify='center'>
									<Text color='muted'>Уже есть аккаунт?</Text>
									<Button as={ReactLink} to='/login' variant='link' colorScheme='cyan'>
										Войти
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={{ boxBR }}
							boxShadow={{ base: 'none', md: 'xl' }}
						>
							<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
								{error && (
									<Alert
										status='error'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'
									>
										<AlertIcon />
										<AlertTitle>Извините!</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<Stack spacing='5'>
									<FormControl>
										<TextField
											type='text'
											name='name'
											placeholder='Ваше имя'
											label='Полное имя'
											error={formik.touched.name ? formik.errors.name : undefined}
										/>

										<TextField
											type='text'
											name='email'
											placeholder='example@example.com'
											label='Электронная почта'
											error={formik.touched.email ? formik.errors.email : undefined}
										/>

										<PasswordField
											type='password'
											name='password'
											placeholder='Ваш пароль'
											label='Пароль'
											error={formik.touched.password ? formik.errors.password : undefined}
											onChange={(e) => {
												formik.handleChange(e);
												checkPasswordRequirements(e.target.value);
												if (!showPasswordRequirements) {
													setShowPasswordRequirements(true);
												}
											}}
										/>

										{showPasswordRequirements && (
											<List spacing={1} mt={2} fontSize='sm'>
												<ListItem>
													<ListIcon
														as={passwordRequirements.minLength ? CheckCircleIcon : WarningIcon}
														color={passwordRequirements.minLength ? 'green.500' : 'red.500'}
													/>
													Не менее 6 символов
												</ListItem>
												<ListItem>
													<ListIcon
														as={passwordRequirements.hasNumber ? CheckCircleIcon : WarningIcon}
														color={passwordRequirements.hasNumber ? 'green.500' : 'red.500'}
													/>
													Содержит хотя бы одну цифру
												</ListItem>
												<ListItem>
													<ListIcon
														as={passwordRequirements.hasUppercase ? CheckCircleIcon : WarningIcon}
														color={passwordRequirements.hasUppercase ? 'green.500' : 'red.500'}
													/>
													Содержит хотя бы одну заглавную букву (латинскую или русскую)
												</ListItem>
												<ListItem>
													<ListIcon
														as={passwordRequirements.hasSymbol ? CheckCircleIcon : WarningIcon}
														color={passwordRequirements.hasSymbol ? 'green.500' : 'red.500'}
													/>
													Содержит хотя бы один специальный символ
												</ListItem>
											</List>
										)}

										<PasswordField
											type='password'
											name='confirmPassword'
											placeholder='Подтвердите ваш пароль'
											label='Подтверждение пароля'
											error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
										/>
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button
										colorScheme='cyan'
										size='lg'
										fontSize='md'
										isLoading={loading}
										type='submit'
										isDisabled={!Object.values(passwordRequirements).every(Boolean) || !formik.isValid}
									>
										Зарегистрироваться
									</Button>
									<Button
										colorScheme='cyan'
										size='lg'
										fontSize='md'
										isLoading={loading}
										onClick={() => handleGoogleLogin()}
									>
										<FcGoogle size={30} />
										Зарегистрироваться через Google
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default RegistrationScreen;