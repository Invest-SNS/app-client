import React, { useEffect } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { getStrategyDatas } from "../../store/reducers/Strategy/getStrategy";
import { decode } from "html-entities";
import { PuffLoader } from 'react-spinners';

export default function InvestStrategyPage() {
  const dispatch = useDispatch();
  const strategy = useSelector((state) => state.strategy.strategy);
  const loading = useSelector((state) => state.strategy.loading);

  useEffect(() => {
    dispatch(getStrategyDatas())
  }, [])

  const ecsummary = strategy.economicAnalysis?.content?.split('\n\n\n')[0];
  const eccontent = strategy.economicAnalysis?.content?.split('\n\n\n').splice(1);

  const corsummary = strategy.corporateAnalysis?.content?.split('\n\n\n')[0];
  const corcontent = strategy.corporateAnalysis?.content?.split('\n\n\n').splice(1);

  return (
    <S.Container>
      <Container>
        {loading ? (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PuffLoader color="#FF7D75" />
          </div>
        ) : (
          strategy && (
            <>
              <Content>
                <MainDiv>
                  <IconImg src="https://em-content.zobj.net/source/microsoft/379/clipboard_1f4cb.png" />
                  <MainFont>{strategy.shinhanDaily?.bbs_name}</MainFont>
                </MainDiv>
                <FileDiv href={`${strategy.shinhanDaily?.attachment_url}`} target="_blank">
                  <FileFont>{strategy.shinhanDaily?.title}.pdf</FileFont>
                </FileDiv>
              </Content>
              <Content>
                <MainDiv>
                  <IconImg src="https://em-content.zobj.net/source/microsoft/379/flashlight_1f526.png" />
                  <MainFont>{strategy.marketIssue?.bbs_name}</MainFont>
                </MainDiv>
                <FileDiv href={`${strategy.marketIssue?.attachment_url}`} target="_blank">
                  <FileFont>{strategy.marketIssue?.title}.pdf</FileFont>
                </FileDiv>
                {/* <ContentFont>{decode(strategy.marketIssue?.content)}</ContentFont> */}
                {strategy.marketIssue?.content.split('\n\n')[0]?.split('\n').map((item, idx) => 
                  <SubDiv key={idx}>
                    <span>•</span>
                    <SubFont key={idx}>{decode(item)}</SubFont>
                  </SubDiv>
                )}
              </Content>
              <Content>
                <MainDiv>
                  <IconImg src="https://em-content.zobj.net/source/microsoft/379/chart-increasing_1f4c8.png" />
                  <MainFont>{strategy.economicAnalysis?.bbs_name}</MainFont>
                </MainDiv>
                <FileDiv href={`${strategy.economicAnalysis?.attachment_url}`} target="_blank">
                  <FileFont>{strategy.economicAnalysis?.title}.pdf</FileFont>
                </FileDiv>
                {ecsummary?.split('\n').map((item, idx) =>
                  <SubDiv key={idx}>
                    <span>•</span>
                    <SubFont key={idx}>{decode(item)}</SubFont>
                  </SubDiv>
                )}
                <br/>
                {eccontent?.map((item, idx) =>
                  <ContentFont key={idx}>{decode(item)}</ContentFont>
                )}
              </Content>
              <Content>
                <MainDiv>
                  <IconImg src="https://em-content.zobj.net/source/microsoft/379/memo_1f4dd.png" />
                  <MainFont>{strategy.corporateAnalysis?.bbs_name}</MainFont>
                </MainDiv>
                <FileDiv href={`${strategy.corporateAnalysis?.attachment_url}`} target="_blank">
                  <FileFont>{strategy.corporateAnalysis?.title}.pdf</FileFont>
                </FileDiv>
                {corsummary?.split('\n').map((item, idx) =>
                  <SubDiv key={idx}>
                    <span>•</span>
                    <SubFont key={idx}>{decode(item)}</SubFont>
                  </SubDiv>
                )}
                <br/>
                {corcontent?.map((item, idx) =>
                  <ContentFont key={idx}>{decode(item)}</ContentFont>
                )}
              </Content>
            </>
          )
        )}
      </Container>
    </S.Container>
  )
}

const Container = styled.div`
  background-color: #FFF;
  overflow-y: scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  }
`

const Content = styled.div`
  padding: 0 0 20px 0;
`

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`

const IconImg = styled.img`
  width: 30px;
  height: 30px;
`

const MainFont = styled.div`
  font-weight: 600;
  font-size: 18px;
`

const FileDiv = styled.a`
  color: #FF7D75;
`

const FileFont = styled.div`
  color: #FF7D75;
  font-weight: 600;
  padding: 20px;
`

const SubDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  gap: 10px;
`

const SubFont = styled.div`
  // word-break: keep-all;
  font-weight: 600;
  font-size: 15px;
`

const ContentFont = styled.div`
  // box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  white-space: pre-line;
  padding: 10px 25px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8)
`