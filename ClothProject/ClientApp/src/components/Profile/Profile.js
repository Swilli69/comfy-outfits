import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-validation/build/select";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../actions/message";
import { editUser, getUser } from "../../actions/profile";
import { validateField, validateRequired } from "../../validation/validation";
import { Field } from "../FormComponents";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Row, Button, Col, Container, Jumbotron } from "reactstrap";

export default function Profile(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ lastname: "", firstname: "", sex: "" });

    const { profile, message,user } = useSelector(state => ({
        profile: state.profile.profile,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUser())
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, props.history])

    const editRecord = () => {
        dispatch(editUser(user.userId, model.lastname, model.firstname, model.sex))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
            })
            .catch(() => { })
    }

    return (
        <Container>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Jumbotron style={{ height: "100px"}} className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("Profile")}: {profile.lastname} {profile.firstname}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(clearMessage()); setModalEdit(true); setModel(profile); }}>
                            <i className="fa fa-pencil" />
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <p>
                <strong>{t("email")}:</strong> {profile.email}
            </p>
            <p>
                <strong>{t("role")}:</strong> {profile.role}
            </p>
            <p>
                <strong>{t("sex")}:</strong> {t(profile.sex)}
            </p>
            <ModalWindow modal={modalEdit} deactiveModal={() => { setModalEdit(false); }} textHeader={t("Edit")}
                textButton={t("Edit")} method={editRecord} message={message}
            >
                <Field name="lastname" value={model}
                    setValue={(e) => { setModel({ ...model, "lastname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="firstname" value={model}
                    setValue={(e) => { setModel({ ...model, "firstname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <div className="form-group">
                    <label htmlFor="sex">{t("sex")}</label>
                    <Select className="form-control" name="sex" value={model.sex} onChange={(e) => setModel({ ...model, "sex": e.target.value })}>
                        <option value='male'>{t("male")}</option>
                        <option value='famale'>{t("famale")}</option>
                    </Select>
                </div>
            </ModalWindow>
        </Container>
    );
}