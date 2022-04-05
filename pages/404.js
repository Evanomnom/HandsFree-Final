import * as Styled from "../components/404/404.styles.js";

export default function NotFound() {
  return (
    <Styled.Root>
      <Styled.TitleText>
        Sorry, you're looking for something that doesn't exist 😩
      </Styled.TitleText>
      <Styled.SubTitleText>
        Hopefully you can try again and find what you're supposed to see
      </Styled.SubTitleText>
    </Styled.Root>
  );
}
