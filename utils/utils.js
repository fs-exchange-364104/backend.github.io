export function newLineUser (userId, user) {
  return {
    uid: user.uid,
    userId: userId,
    provider_id: 'line',
    tags: 'unverified',
    date: Date().now(),
    account: {
      email: 'NA',
      emailVerified: user.emailVerified,
      fullName: 'NA',
      phoneNumber: 'NA',
      phoneVerified: false,
      phoneStatus: 'request',
      passport: 'NA',
      passportVerified: false,
      passportStatus: 'request',
      passportURL: 'NA'
    },
    bank: {
      bankName: 'NA',
      bankName2: '',
      bankNumber: 'NA',
      bankVerified: false,
      bankStatus: 'request',
      bankURL: 'NA'
    }
  };
}

export const newLineMessage = (user) => {
  return {
    channelId: '0dd971f418ac41cbbf7d67d93b16e01e',
    to: 'Ucd21733a3fc45798492dddd289fdf174',
    type: 'text',
    content: {
      text: `มีรายการสมัครใหม่ UID: ${user.uid}`
    }
  };
};
