export const WEBMASTER_VERIFICATION_FIELDS = [
  {
    name: 'naverVerification' as const,
    label: '네이버 Search Advisor',
    metaName: 'naver-site-verification',
  },
  {
    name: 'googleVerification' as const,
    label: 'Google Search Console',
    metaName: 'google-site-verification',
  },
  {
    name: 'bingVerification' as const,
    label: 'Bing Webmaster Tools',
    metaName: 'msvalidate.01',
  },
] as const
