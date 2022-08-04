import { Button, Col, Row } from 'antd';
import React from 'react';

function PaginationPokemon(props) {
    return (
        <Row gutter={8} style={{ marginBottom:10 }}>
            <Col span={2}>
                <Button size='large' onClick={props.previousPage}>Previous</Button>
            </Col>
            <Col span={2}>
                <Button type='primary' size='large' onClick={props.nextPage}>Next</Button>
            </Col>
        </Row>
    );
}

export default PaginationPokemon;