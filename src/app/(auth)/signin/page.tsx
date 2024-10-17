'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, getToken } from '../../../api/api'
import styles from './signin.module.css'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { setUser } from '@/store/features/authSlice'

const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
	const dispatch = useDispatch()

	const validateEmail = (email: string) => {
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return re.test(String(email).toLowerCase())
	}

	const validatePassword = (password: string) => {
		return password.length >= 6
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!validateEmail(email)) {
			setError('Пожалуйста, введите корректный email адрес')
			return
		}

		if (!validatePassword(password)) {
			setError('Пароль должен содержать не менее 6 символов.')
			return
		}

		try {
			const user = await loginUser(email, password)
			const tokens = await getToken(email, password)
			localStorage.setItem('accessToken', tokens.access)
			localStorage.setItem('refreshToken', tokens.refresh)
			localStorage.setItem('username', user.username)
			dispatch(setUser(user.username))
			router.push('/')

		} catch (err) {

			if (err instanceof Error) {
				let errorMsg = ''
				try {
					const parsedError = JSON.parse(err.message.split(': ')[1])
					if (parsedError && typeof parsedError === 'object' && parsedError.data && parsedError.data.errors) {
						const errors = parsedError.data.errors
						if (errors.email && errors.email.length > 0) {
							errorMsg = errors.email[0]
						}
						if (errors.password && errors.password.length > 0) {
							errorMsg += errorMsg ? ' ' : ''
							errorMsg += errors.password[0]
						}
						if (!errorMsg) {
							errorMsg = "Неверные учетные данные. Пожалуйста, проверьте email и пароль."
						}
					} else {
						errorMsg = parsedError.message || 'Неизвестная ошибка'
					}
				} catch (parseError) {
					// Если не удалось распарсить ошибку, оставляем общее сообщение
					console.error('Ошибка при парсинге ответа:', parseError)
				}
				setError(errorMsg)
			} else {
				setError('Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.')
			}
		}
	}

	return (
		<form className={styles.modalFormLogin} onSubmit={handleSubmit}>
			<Link href='/'>
				<div className={styles.modalLogo}>
					<Image
						src='/img/logo_modal.png'
						alt='logo'
						width={140}
						height={21}
					/>
				</div>
			</Link>
			<input
				className={`${styles.modalInput} ${styles.login}`}
				type='text'
				name='login'
				placeholder='Почта'
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<input
				className={styles.modalInput}
				type='password'
				name='password'
				placeholder='Пароль'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			{error && <p className={styles.error}>{error}</p>}
			<button className={styles.modalBtnEnter} type='submit'>
				Войти
			</button>
			<button className={styles.modalBtnSignup}>
				<Link href='/signup'>Зарегистрироваться</Link>
			</button>
		</form>
	)
}

export default SignIn