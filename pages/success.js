import * as Styled from "../components/landing/success.styles";
import Head from "next/head";

export default function Success() {
  return (
    <Styled.Root>

      <Head>
        <title>Payment Successful!</title>
        <link
          href="seravek/seravek.css"
          rel="stylesheet"
        ></link>
      </Head>

      <Styled.Box>
        <Styled.TitleDiv>
          <Styled.TitleText>Thank you for joining the HandsFree family!</Styled.TitleText>
          <Styled.SubtitleText>Your purchase was successful and a sales representative will be in contact with you in the next 24 hours</Styled.SubtitleText>
        </Styled.TitleDiv>
        <Styled.BackToHomeButton onClick={() => (window.location.href = '/index')}>Back to Home</Styled.BackToHomeButton>
      </Styled.Box>

      
    </Styled.Root>

  );
}
