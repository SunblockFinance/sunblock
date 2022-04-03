// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

import { useSnackbar } from 'notistack'

export function useSnackbarNotifications() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const NotifyAllowanceRemoved = enqueueSnackbar(
    `🔓 You are safe. We have ZERO access to your funds now. Stay safe out there!`,
    {
      variant: 'success',
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
    }
  )

  const NotifyAllowanceIncresed = enqueueSnackbar(
    `👍 Done! Allowance has been increased. Thanks for the trust!`,
    {
      variant: 'success',
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
    }
  )

  const NotifySharesPurchased = enqueueSnackbar(
    `👍 Done! You now got new shares. Nice!`,
    {
      variant: 'success',
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
    }
  )

  const NotifyFailure = enqueueSnackbar(
    "🙁 That didn't work as expected... Try again?",
    {
      variant: 'error',
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
    }
  )

  const NotifyNeedConnectedMetamask = enqueueSnackbar(
    "🙁 That didn't work as expected... Try again?",
    {
      variant: 'error',
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
    }
  )

  return {NotifyAllowanceIncresed, NotifyAllowanceRemoved, NotifyFailure, NotifySharesPurchased, NotifyNeedConnectedMetamask}
}
