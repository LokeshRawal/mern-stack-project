import { Form, Col } from "react-bootstrap";
import Select from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export const EmailInputField = ({label, required, handleChange, errMsg}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3"> {label}:  </Form.Label>
            <Col sm={9}>
                <Form.Control
                    type="email"
                    size="sm"
                    placeholder="Enter your Username"
                    name="email"
                    required={required}
                    onChange={handleChange}

                />
                <span className="text-danger">{errMsg}</span>
            </Col>
        </Form.Group>

    </>)
}

export const PasswordInputfield = ({label, required, handleChange, errMsg}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3"> {label}:  </Form.Label>
            <Col sm={9}>
                <Form.Control
                    type="password"
                    size="sm"
                    required={required}
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    name="password"
                />
                <span className="text-danger">{errMsg}</span>
            </Col>
        </Form.Group>
    </>)
}

export const TextInputField = ({label, type='text', name, required, changeEvent, defaultValue="", placeholder="Enter the value...", error}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm="9">
                <Form.Control
                    type={type}
                    name={name}
                    size="sm"
                    required={required}
                    onChange={changeEvent}
                    value={defaultValue}
                    placeholder={placeholder}
                />
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    </>)
}

export const NumberInputField = ({label, min= null, max= null, name, required, changeEvent, defaultValue="", placeholder="Enter the value...", error}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm="9">
                <Form.Control
                    type={"number"}
                    name={name}
                    min={min}
                    max={max}
                    size="sm"
                    required={required}
                    onChange={changeEvent}
                    value={defaultValue}
                    placeholder={placeholder}
                />
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    </>)
}

export const SelectList = ({label, name, options, multiple=false, selOpt=null, changeEvent, error=null}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm="9">
                <Select
                        options={options}
                        isMulti={multiple}
                        name={name}
                        value={selOpt}
                        onChange={(e) => {
                            changeEvent(e)
                        }}
                />
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    </>)
}

export const HtmlEditor = ({defaultValue=null, changeEvent}) => {
    return(<>
        <CKEditor
            editor={ ClassicEditor }
            data={defaultValue}
            
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                changeEvent(data)
            } }
           
        />
    </>)
}

export const TextEditor = ({label, error, defaultValue, changeEvent}) => {
    return(<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm="9">
                <HtmlEditor 
                    defaultValue={defaultValue}
                    changeEvent={changeEvent}
                />
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    </>)
}

