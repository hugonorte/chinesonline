import { useState, useRef } from 'react'
import { useI18n } from '../../i18n/i18nContext'
import styles from './ContactForm.module.scss'

export type ContactFormProps = {
  className?: string
}

type FormState = {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ className }: ContactFormProps) {
  const { t } = useI18n()
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot validation: if this field is filled, reject the submission
    if (formData.honeypot.trim() !== '') {
      // Silently ignore bot submissions (don't reveal honeypot)
      setStatus('success')
      formRef.current?.reset()
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      })
      return
    }

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus('error')
      setErrorMessage(t('contact.formErrorRequired'))
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus('error')
      setErrorMessage(t('contact.formErrorEmail'))
      return
    }

    // Validate message length (at least 10 characters)
    if (formData.message.trim().length < 10) {
      setStatus('error')
      setErrorMessage(t('contact.formErrorMessage'))
      return
    }

    setStatus('submitting')

    try {
      // Send form data to backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      })

      if (response.ok) {
        setStatus('success')
        formRef.current?.reset()
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: '',
        })
      } else {
        setStatus('error')
        setErrorMessage(t('contact.formError'))
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(t('contact.formErrorConnection'))
    }
  }

  return (
    <div className={`${styles.contactForm} ${className || ''}`}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
      >
        {/* Status message */}
        {status === 'success' && (
          <div className={styles.successMessage} role="alert">
            <p>{t('contact.formSuccess')}</p>
          </div>
        )}

        {status === 'error' && (
          <div className={styles.errorMessage} role="alert">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Honeypot field (hidden from real users) */}
        <div className={styles.honeypot} aria-hidden="true">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name field */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {t('contact.formName')} <span className={styles.required}>{t('contact.formRequired')}</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder={t('contact.formNamePlaceholder')}
            required
            disabled={status === 'submitting'}
          />
        </div>

        {/* Email field */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t('contact.formEmail')} <span className={styles.required}>{t('contact.formRequired')}</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder={t('contact.formEmailPlaceholder')}
            required
            disabled={status === 'submitting'}
          />
        </div>

        {/* Subject field */}
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            {t('contact.formSubject')} <span className={styles.required}>{t('contact.formRequired')}</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.input}
            placeholder={t('contact.formSubjectPlaceholder')}
            required
            disabled={status === 'submitting'}
          />
        </div>

        {/* Message field */}
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            {t('contact.formMessage')} <span className={styles.required}>{t('contact.formRequired')}</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            placeholder={t('contact.formMessagePlaceholder')}
            rows={6}
            required
            disabled={status === 'submitting'}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? t('contact.formSubmitting') : t('contact.formSubmit')}
        </button>
      </form>
    </div>
  )
}
