import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderContent>
                <HeaderRight>
                    <Logo>Lorem Ipsum</Logo>
                    <UserAvatar />
                </HeaderRight>
            </HeaderContent>
            <NavigationBar>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 1</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 2</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 3</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 4</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 5</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 6</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 7</NavText>
                    <NavChevron />
                </NavItem>
                <NavItem>
                    <NavIcon>?</NavIcon>
                    <NavText>Nav 8</NavText>
                    <NavChevron />
                </NavItem>
            </NavigationBar>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
  background-color: #1CA329;
  color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const UserAvatar = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background-color: #777777;
    border-radius: 50%;
    z-index: 1;
  }
  
  &::after {
    content: 'ED';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    z-index: 2;
  }
`;

const NavigationBar = styled.nav`
  display: flex;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  overflow-x: auto;
  white-space: nowrap;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
  border-right: 1px solid #eee;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavIcon = styled.div`
  background-color: #ccc;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 8px;
`;

const NavText = styled.span`
  font-size: 14px;
`;

const NavChevron = styled.div`
  margin-left: 8px;
  font-size: 10px;
  color: #999;
  
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 2px solid #999;
    border-bottom: 2px solid #999;
    transform: rotate(45deg);
    position: relative;
    top: -2px;
  }
`;

export default Header;
