import { useControls } from "leva";
import { useRef } from "react";
import styled from "styled-components";
import useMoveTo from "../../hooks/useMoveTo";

import bg from "../../assets/card_bg.jpg";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const GridWrapper = styled.div`
  flex: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  position: relative;
  color: #ffffff;
  pointer-events: auto;
  backdrop-filter: blur(6px);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 0px;
    border-style: solid;
    border-width: 1px;
    border-image: linear-gradient(
        135deg,
        rgba(141, 141, 141, 0.2) 0%,
        rgba(255, 255, 255, 0.08) 100%
      )
      10 / 1px / 0 stretch;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${bg});
    background-size: 100px;
    opacity: 0.2;
    border-radius: 0px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 36px;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #ffffff;
  padding-left: 20px;
`;

export default function Content() {
  const topBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef1 = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef1 = useRef<HTMLDivElement>(null);

  // 显示主面板
  const { restart: topRestart, reverse: topReverse } = useMoveTo(
    topBoxRef,
    "toBottom",
    0.6,
    1
  );
  const { restart: leftRestart, reverse: leftReverse } = useMoveTo(
    leftBoxRef,
    "toRight",
    0.8,
    1.5
  );
  const { restart: rightRestart, reverse: rightReverse } = useMoveTo(
    rightBoxRef,
    "toLeft",
    0.8,
    1.5
  );
  const { restart: leftRestart1, reverse: leftReverse1 } = useMoveTo(
    leftBoxRef1,
    "toRight",
    0.8,
    1.5
  );
  const { restart: rightRestart1, reverse: rightReverse1 } = useMoveTo(
    rightBoxRef1,
    "toLeft",
    0.8,
    1.5
  );

  useControls({
    showMain: {
      label: "显示内容面板",
      value: true,
      onChange: (v: boolean) => {
        if (v) {
          topRestart();
          leftRestart();
          leftRestart1();
          rightRestart();
          rightRestart1();
        } else {
          topReverse();
          leftReverse();
          leftReverse1();
          rightReverse();
          rightReverse1();
        }
      },
    },
  });

  return (
    <Wrapper>
      <Card ref={topBoxRef}>
        <Title>四川省地图示例</Title>
      </Card>
      <GridWrapper>
        <Card ref={leftBoxRef} style={{ gridArea: "1 / 1 / 3 / 2" }}></Card>
        <Card ref={leftBoxRef1} style={{ gridArea: "3 / 1 / 5 / 2" }}></Card>
        <Card ref={rightBoxRef} style={{ gridArea: "1 / 4 / 3 / 5" }}></Card>
        <Card ref={rightBoxRef1} style={{ gridArea: "3 / 4 / 5 / 5" }}></Card>
      </GridWrapper>
    </Wrapper>
  );
}
