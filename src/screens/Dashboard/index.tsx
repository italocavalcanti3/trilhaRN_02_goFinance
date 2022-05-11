import React from 'react';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserName,
} from './styles';



export function Dashboard() {

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/87244758?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Italo</UserName>
                        </User>
                    </UserInfo>
                    <Icon name='power' />
                </UserWrapper>
            </Header>

        </Container>
    );
}