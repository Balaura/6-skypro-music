'use client'

import React from 'react'
import styles from './signin.module.css'

const SigninLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>{children}</div>
      </div>
    </div>
  )
}

export default SigninLayout
