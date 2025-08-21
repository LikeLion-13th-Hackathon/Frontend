import React from 'react'
import styled from 'styled-components'

const Profile = ({
    avatarUrl = '',      // 이미지 URL (없으면 회색)
    name = 'User',       // 닉네임
    subtitle = '',       // 한 줄 설명/별명
    className,
}) => {
  return (
    <Wrap className={className}>
        <Avatar $src={avatarUrl} aria-label="프로필 이미지" />
        <Info>
            <Name title={name}>{name}</Name>
            {subtitle && <Sub>{subtitle}</Sub>}
        </Info>
    </Wrap>
  )
}

export default Profile

const Wrap = styled.div`
    display: flex;
    width: 192px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background: ${({ $src }) =>
    $src ? `url(${$src}) center / cover no-repeat` : `#ffffff`};
  /* box-shadow: 0 2px 10px rgba(0,0,0,.06); */
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Name = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.48px;
  max-width: 100%;
  white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
`;

const Sub = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
  max-width: 100%;
  white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
`;
