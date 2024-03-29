import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getkospiKosdaqDatas } from '../../../store/reducers/Chart/kospiKosdaq';
import styled from 'styled-components';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

export default function KospiContent() {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.kospiKosdaq.data);

  const kospiNum = parseFloat(content?.kospi?.upDown);
  const kosdaqNum = parseFloat(content?.kosdaq?.upDown);
  const kospiRate = parseFloat(content?.kospi?.rate);
  const kosdaqRate = parseFloat(content?.kosdaq?.rate);

  useEffect(() => {
    dispatch(getkospiKosdaqDatas())
    const timer = setInterval(() => {
      dispatch(getkospiKosdaqDatas());
    }, 3000)

    return () => clearInterval(timer);
  }, [])

  return (
    <Container>
      <SubContainer>
        <Content>
          <span>KOSPI</span>
          <MainFont>{content?.kospi?.price}</MainFont>
        </Content>
        <Content>
          <div>
            {kospiNum > 0 ?
              <CaretUpFill color="#c70606" />
            : kospiNum < 0 ? 
              <CaretDownFill color="#0636c7" />
            : null
            }
            <NumFont num={kospiNum ? kospiNum : 1}>{content?.kospi?.upDown}</NumFont>
          </div>
          <NumFont num={kospiRate ? kospiRate : 1}>({content?.kospi?.rate}%)</NumFont>
        </Content>
      </SubContainer>
      <SubContainer>
        <Content>
          <span>KOSDAQ</span>
          <MainFont>{content?.kosdaq?.price}</MainFont>
        </Content>
        <Content>
          <div>
            {kosdaqNum > 0 ?
              <CaretUpFill color="#c70606" />
            : kosdaqNum < 0 ? 
              <CaretDownFill color="#0636c7" />
            : null
            }
            <NumFont num={kosdaqNum ? kosdaqNum : 1}>{content?.kosdaq?.upDown}</NumFont>
          </div>
          <NumFont num={kosdaqRate ? kosdaqRate : 1}>({content?.kosdaq?.rate}%)</NumFont>
        </Content>
      </SubContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 14px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  gap: 7px;
  font-size: 14px;
`

const MainFont = styled.span`
  font-weight: 600;
  font-size: 15px;
`

const NumFont = styled.span`
  color: ${(props) => props.num > 0 ? "#c70606" : props.num < 0 ? "#0636c7" : "#000"};
`
