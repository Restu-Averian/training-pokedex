import { Card, Space,Image, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import CardComp from '../components/CardComp';

function ListPokePage() {
    const [dataPoke, setdataPoke] = useState(null)
    const [loading, setloading] = useState(true)
    const [urlData, seturlData] = useState(null)
    const [img,setImg] = useState(null)
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon'


    const fetchDataPoke = async(api)=>{
        try{
            let dataPoke = await axios.get(api)
            setdataPoke(dataPoke.data)
            setloading(false)
           
            
        }catch(e){
            console.log("error : ",e)
        }
        
    }
    const nextPage = async()=>{
        fetchDataPoke(dataPoke.next)
        
    }
    const previousPage = ()=>{
        fetchDataPoke(dataPoke.previous)
    }
    useEffect(() => {
        fetchDataPoke(baseUrl)
    }, [])


    return (
        <ContentCustom className="site-card-wrapper">
            <Row gutter={8} style={{ marginBottom:10 }}>
                <Col span={2}>
                    <Button size='large' onClick={previousPage}>Previous</Button>
                </Col>
                <Col span={2}>
                    <Button type='primary' size='large' onClick={nextPage}>Next</Button>
                </Col>
            </Row>
            <Row gutter={16}>
                {loading?(
                    <Col span={8}>
                        <Card title="Card title" bordered={false}>
                        Loading...
                        </Card>
                    </Col>
                ):(
                    <>
                        {dataPoke.results.map(
                            (data)=>{
                                return(     
                                    <Col key={data.name} span={6}>
                                        <Card 
                                        title={data.name} 
                                        size="small"
                                        hoverable
                                        bordered={false}
                                        style={{
                                            width: 320,
                                            marginBottom:20
                                          }}
                                        cover={<img alt="example" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${data.url.substring(33, data.url.length-1)}.png`} />}
                                        >
                                        </Card>
                                    </Col>
                                )
                            }
                        )}
                    </>
                )}
                
            </Row>
        </ContentCustom>
    )
}

export default ListPokePage;

const ContentCustom = styled.div`
    padding: 30px;
    background: #ececec;
`
