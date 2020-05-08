import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import 'isomorphic-unfetch'
import Router from 'next/router'
import NProgress from 'nprogress'

import 'react-markdown-editor-lite/lib/index.css'
import 'highlight.js/styles/a11y-light.css'
import '../styles/nprogress.css'
import 'antd/dist/antd.less'
import '../styles/global.less'
import '../styles/lessvars.less'
import withUrql from '../lib/withUrqlClient'
import { initGA, logPageView } from '../utils/analytics'
import { getSiteLayout } from '../components/layouts/SiteLayout'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initGA()
    logPageView()
    Router.events.on('routeChangeComplete', logPageView)
  }, [])

  const getLayout = (Component as any).getLayout || getSiteLayout

  return getLayout(<Component {...pageProps} />)
}

export default withUrql(MyApp)
