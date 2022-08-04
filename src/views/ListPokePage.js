import { Card, Space,Image, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PaginationPokemon from '../components/PaginationPokemon';
// import CardComp from '../components/CardComp';

function ListPokePage() {
    const [dataPoke, setdataPoke] = useState(null)
    const [loading, setloading] = useState(true)
    let [limit,setLimit] = useState(20)
    const baseUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`


    const fetchDataPoke = async(api)=>{
        try{
            let dataPoke = await axios.get(api)
            setdataPoke(dataPoke.data)
            setloading(false)
        console.log("url : ",api)
           
            
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

    /* Still having bugs */
    // const moreData = ()=>{
    //     setLimit(limit+=20)
    //     let url = `${baseUrl}/?offset=0&limit=${limit}` 
    //     fetchDataPoke(url)

    // }


    useEffect(() => {
        fetchDataPoke(baseUrl)
    }, [])


    return (
        <ContentCustom className="site-card-wrapper">
            <PaginationPokemon previousPage={previousPage} nextPage={nextPage}/>
            <Row >
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
                                    <Col  xs={19}  xl={6} md={9} key={data.name} style={{ margin:'auto' }}>
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
            
            {/* Still having bugs */}
            {/* <Button onClick={moreData}>More</Button> */}
            <PaginationPokemon previousPage={previousPage} nextPage={nextPage}/>

        </ContentCustom>
    )
}

export default ListPokePage;

const ContentCustom = styled.div`
    padding: 30px;
    background: #ececec;
`