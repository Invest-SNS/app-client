import React, { useEffect } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { getStrategyDatas } from "../../store/reducers/Strategy/getStrategy";

export default function InvestStrategyPage() {
  const dispatch = useDispatch();
  const strategy = useSelector((state) => state.strategy.strategy);

  const marketIssue = strategy.marketIssue.content.split('\n\n')[0];
  const corporateAnalysis = strategy.corporateAnalysis.content.split('\n\n\n')[0];

  useEffect(() => {
    dispatch(getStrategyDatas())
  }, [])

  return (
    <S.Container>
      <Container>
        <>
          <MainDiv>
            <IconImg src="https://em-content.zobj.net/source/microsoft/379/clipboard_1f4cb.png" />
            <MainFont>{strategy.shinhanDaily.bbs_name}</MainFont>
          </MainDiv>
          <FileDiv href={`${strategy.shinhanDaily.attachment_url}`} target="_blank">
            <FileFont>{strategy.shinhanDaily.title}.pdf</FileFont>
          </FileDiv>
        </>
        <>
          <MainDiv>
            <IconImg src="https://em-content.zobj.net/source/microsoft/379/flashlight_1f526.png" />
            <MainFont>{strategy.marketIssue.bbs_name}</MainFont>
          </MainDiv>
          <FileDiv href={`${strategy.marketIssue.attachment_url}`} target="_blank">
            <FileFont>{strategy.marketIssue.title}.pdf</FileFont>
          </FileDiv>
          {marketIssue.split('\n').map((item, idx) => 
            <SubDiv key={idx}>
              <span>•</span>
              <SubFont key={idx}>{item.replace(/&middot;/g, "·").replace(/&nbsp;/g, "")}</SubFont>
            </SubDiv>
          )}
        </>
        <>
          <MainDiv>
            <IconImg src="https://em-content.zobj.net/source/microsoft/379/chart-increasing_1f4c8.png" />
            <MainFont>{strategy.economicAnalysis.bbs_name}</MainFont>
          </MainDiv>
          <FileDiv href={`${strategy.economicAnalysis.attachment_url}`} target="_blank">
            <FileFont>{strategy.economicAnalysis.title}.pdf</FileFont>
          </FileDiv>
          <ContentFont>{strategy.economicAnalysis.content.replace(/&nbsp;/g, "")}</ContentFont>
        </>
        <>
          <MainDiv>
            <IconImg src="https://em-content.zobj.net/source/microsoft/379/memo_1f4dd.png" />
            <MainFont>{strategy.corporateAnalysis.bbs_name}</MainFont>
          </MainDiv>
          <FileDiv href={`${strategy.corporateAnalysis.attachment_url}`} target="_blank">
            <FileFont>{strategy.corporateAnalysis.title}.pdf</FileFont>
          </FileDiv>
          {corporateAnalysis.split('\n').map((item, idx) => 
            <SubDiv key={idx}>
              <span>•</span>
              <SubFont key={idx}>{item.replace(/&middot;/g, "·").replace(/&nbsp;/g, "")}</SubFont>
            </SubDiv>
          )}
        </>
      </Container>
    </S.Container>
  )
}

const Container = styled.div`
  background-color: #FFF;
  overflow-y: scroll;

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
  text-decoration: none;
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
  word-break: keep-all;
  font-weight: 600;
`

const ContentFont = styled.div`
  white-space: pre-line;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
`