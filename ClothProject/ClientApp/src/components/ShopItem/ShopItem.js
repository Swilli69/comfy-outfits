import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createShopItem, deleteShopItem, editShopItem, getShopItems } from '../../actions/shopItem';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';
import Select from "react-validation/build/select";

const ShopItem = (props) => {
    const id = props.match.params.id;

    const clothType = ["Труси", "Шорти", "Футболка", "Куртка"];
    const clothCategory = ["Спортивна", "Парадна", "Домашня"];

    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ shopItemId: 0, name: "", price: 1, amount: 1, size: "", colour: "", clothCategoryId: 1, clothTypeId: 1 });

    const dispatch = useDispatch();

    const { name, address, shopItems, message } = useSelector(state => ({
        name: state.shopItem.name,
        address: state.shopItem.address,
        shopItems: state.shopItem.shopItems,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShopItems(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createShopItem(model.name, model.price, model.amount, model.size, model.colour, model.clothCategoryId, model.clothTypeId, id))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ shopItemId: 0, name: "", price: 1, amount: 1, size: "", colour: "", clothCategoryId: 1, clothTypeId: 1 });
    }

    const editRecord = () => {
        dispatch(editShopItem(
            model.shopItemId,
            model.name,
            model.price,
            model.amount,
            model.size,
            model.colour,
            model.clothCategoryId,
            model.clothTypeId,
            clothCategory[model.clothCategoryId - 1],
            clothType[model.clothTypeId - 1]
        ))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteShopItem(item.shopItemId))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    return (
        <Container>
            <Jumbotron style={{ height: "150px" }} className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("name")}: {name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("address")}: {address}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getShopItems(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("shopItems")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success"><i className="fa fa-plus" aria-hidden="true"></i></Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={shopItems} k="shopItemId" columns={['name', 'price', 'amount', 'size', 'colour', 'clothCategory', 'clothType']} deleteRecord={deleteRecord} editRecord={getUserValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="price" value={model}
                    setValue={(e) => { setModel({ ...model, "price": e.target.value }) }} type="number" min={1} />
                <Field name="amount" value={model}
                    setValue={(e) => { setModel({ ...model, "amount": e.target.value }) }} type="number" min={1} />
                <Field name="size" value={model}
                    setValue={(e) => { setModel({ ...model, "size": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="colour" value={model}
                    setValue={(e) => { setModel({ ...model, "colour": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <div className="form-group">
                    <label htmlFor="clothCategoryId">{t("clothCategoryId")}</label>
                    <Select className="form-control" name="clothCategoryId" value={model.clothCategoryId} onChange={(e) => setModel({ ...model, "clothCategoryId": e.target.value })}>
                        {clothCategory.map((x, index) => <option value={index+1}>{x}</option>)}
                    </Select>
                </div>
                <div className="form-group">
                    <label htmlFor="clothTypeId">{t("clothTypeId")}</label>
                    <Select className="form-control" name="clothTypeId" value={model.clothTypeId} onChange={(e) => setModel({ ...model, "clothTypeId": e.target.value })}>
                        {clothType.map((x, index) => <option value={index + 1}>{x}</option>)}
                    </Select>
                </div>
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="price" value={model}
                    setValue={(e) => { setModel({ ...model, "price": e.target.value }) }} type="number" min={1} />
                <Field name="amount" value={model}
                    setValue={(e) => { setModel({ ...model, "amount": e.target.value }) }} type="number" min={1} />
                <Field name="size" value={model}
                    setValue={(e) => { setModel({ ...model, "size": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="colour" value={model}
                    setValue={(e) => { setModel({ ...model, "colour": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <div className="form-group">
                    <label htmlFor="clothCategoryId">{t("clothCategoryId")}</label>
                    <Select className="form-control" name="clothCategoryId" value={model.clothCategoryId} onChange={(e) => setModel({ ...model, "clothCategoryId": e.target.value })}>
                        {clothCategory.map((x, index) => <option value={index + 1}>{x}</option>)}
                    </Select>
                </div>
                <div className="form-group">
                    <label htmlFor="clothTypeId">{t("clothTypeId")}</label>
                    <Select className="form-control" name="clothTypeId" value={model.clothTypeId} onChange={(e) => setModel({ ...model, "clothTypeId": e.target.value })}>
                        {clothType.map((x, index) => <option value={index + 1}>{x}</option>)}
                    </Select>
                </div>
            </ModalWindow>
        </Container>
    );
};

export default ShopItem;