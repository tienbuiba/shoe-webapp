import { Grid } from '@mui/material'
import React from 'react'

export default function Map() {
  const iframeRef = React.createRef();
  const [iframeHeight, setIframeHeight] = React.useState('400px');

  React.useEffect(() => {
    setIframeHeight(`${iframeRef.current.contentWindow.document.documentElement.scrollHeight}px`);
  }, []);

  return (
    <Grid>
      <iframe ref={iframeRef}
        id="widget"
        name="widget"
        title="widget"
        scrolling="yes"
        frameBorder="0"
        width="100%"
        height={iframeHeight}
        src="https://maps.google.com/maps?width=505&amp;height=401&amp;hl=en&amp;q=84%20Duy%20Tan%20Hanoi+(Titan%20Power)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
    </Grid>
  )

}
