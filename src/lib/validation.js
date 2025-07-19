export const emailValidation = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (
    email.length < 2 
    || !emailRegex.test(email)
  ) {
    return _createErrorMessage("Некорректная почта.")
  }

  return true
}

export const passwordValidation = (password) => {
  if (password.length < 6) {
    return _createErrorMessage("Короткий пароль.")
  }

  if (password.length > 20) {
    return _createErrorMessage("Слишком длинный пароль.")
  }

  return true
}

export default function validation(email, password) {
  const emailValid = emailValidation(email)
  const passwordValid = passwordValidation(password)

  const errors = {}
  let isValid = true

  if (emailValid?.error) {
    errors.email = emailValid
    isValid = false
  }

  if (passwordValid?.error) {
    errors.password = passwordValid
    isValid = false
  }

  return { isValid, errors }
}

const _createErrorMessage = (message) => {
  return {
    error: {
      message: message
    }
  }
} 