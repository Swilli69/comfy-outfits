import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateAddress, validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createShop, deleteShop, editShop, getShops } from '../../actions/shop';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const Shop = (props) => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ shopId: 0, name: "", address: "" });

    const dispatch = useDispatch();

    const { shops, message } = useSelector(state => ({
        shops: state.shop.shops,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShops());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createShop(model.name, model.address))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ shopId: 0, name: "", address: "" });
    }

    const editRecord = () => {
        dispatch(editShop(model.shopId, model.name, model.address))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteShop(item.shopId))
            .then(() => { })
            .catch(() => { })
    }

    const openPage = (item) => {
        props.history.push("/shopItems/" + item.shopId);
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("shops")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success"><i className="fa fa-plus" aria-hidden="true"></i></Button>
                        <Button onClick={() => { dispatch(getShops()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={shops} k="shopId" columns={['name', 'address']} deleteRecord={deleteRecord} editRecord={getUserValues} openPage={openPage}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default Shop;