import { useState, useEffect } from 'react';
import { db } from '../../db/firebase-config';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { styled } from 'styled-components';
import Header from '../../components/common/Header';

const Rank = () => {
  const rankCollectionRef = collection(db, "rank");
  const [rankInfo, setRankInfo] = useState([]);

  useEffect(() => {
    const getRankInfo = async () => {
      // const data = await getDocs(rankCollectionRef);
      const data = await getDocs(query(rankCollectionRef, orderBy('score')));
      setRankInfo(data.docs.map((doc) => (
        {...doc.data(), id: doc.id}
      )));
    }
    getRankInfo();
  }, []);

  return (
    <>
      <Container>
        <Header value='rank' />
        <Table>
          <TableHeader>
            <tr>
              <Th>순위</Th>
              <Th>닉네임</Th>
              <Th>최고기록</Th>
              <Th>달성시간</Th>
            </tr>
          </TableHeader>
          <TableBody>
            {
              rankInfo.map((data, index) => {
                const date = new Date(data.date.seconds * 1000);
                return (
                  <tr key={data.id}>
                  <Td>{index+1}위</Td>
                  <Td>{data.name}</Td>
                  <Td>{data.score}ms</Td>
                  <Td>{date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일 {date.getHours()}시 {date.getMinutes()}분 {date.getSeconds()}초</Td>
                </tr>
                )
              })
            }
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  table-layout: fixed;
  margin-bottom: 30px;
`;

const TableHeader = styled.thead`
  width: 70vw;
  background-color: #AFD3E2;
  border-radius: 10px 10px 0px 0px;
`;

const Th = styled.th`
  width: 33.33vw;
  background-color: #AFD3E2;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
  line-height: 35px;
  text-align: left;
`;

const TableBody = styled.tbody`
  width: 70vw;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
`;

const Td = styled.td`
  width: 17.5vw;
  background-color: white;
  font-size: 15px;
  font-family: 'GmarketSansMedium';
  line-height: 40px;
  text-align: left;
`;

export default Rank;