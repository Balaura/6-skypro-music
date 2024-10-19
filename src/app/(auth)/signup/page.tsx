'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './signup.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { register } from '@/store/features/authSlice'

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [username, setUsername] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (isSubmitting) {
			return
		}

		setIsSubmitting(true)

		if (password !== confirmPassword) {
			setError('Пароли не совпадают')
			setIsSubmitting(false)
			return
		}

		try {
			await dispatch(register({ email, password, username })).unwrap()
			router.push('/signin')
		} catch (err) {
			if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
				let errorMsg = '';
				try {
					// Убедимся, что мы имеем дело с корректной частью JSON
					const jsonStartIndex = (err as { message: string }).message.indexOf('{');
					const parsedError = JSON.parse((err as { message: string }).message.substring(jsonStartIndex));

					if (parsedError && typeof parsedError === 'object') {
						if (parsedError.data && parsedError.data.errors) {
							const errors = parsedError.data.errors;
							if (errors.email && errors.email.length > 0) {
								errorMsg = errors.email[0];
							}
							if (errors.password && errors.password.length > 0) {
								errorMsg += errorMsg ? ' ' : '';
								errorMsg += errors.password[0];
							}
							if (errors.username && errors.username.length > 0) {
								errorMsg += errorMsg ? ' ' : '';
								errorMsg += errors.username[0];
							}
						}

						if (!errorMsg) {
							errorMsg = parsedError.message || 'Неизвестная ошибка';
						}
					}
				} catch (parseError) {
					console.error('Ошибка при парсинге ответа:', parseError);
				}
				setError(errorMsg);
			} else {
				setError('Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.');
			}
		} finally {
			setIsSubmitting(false)
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
				type='text'
				name='username'
				placeholder='Имя пользователя'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				className={`${styles.modalInput} ${styles.passwordFirst}`}
				type='password'
				name='password'
				placeholder='Пароль'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<input
				className={`${styles.modalInput} ${styles.passwordDouble}`}
				type='password'
				name='confirmPassword'
				placeholder='Повторите пароль'
				value={confirmPassword}
				onChange={e => setConfirmPassword(e.target.value)}
			/>
			{error && <p className={styles.error}>{error}</p>}
			<button className={styles.modalBtnSignupEnt} type='submit'>
				Зарегистрироваться
			</button>
		</form>
	)
}

export default SignUp