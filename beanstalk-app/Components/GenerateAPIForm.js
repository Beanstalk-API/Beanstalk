// stylesheet
import style from "@/styles/generate_api_form.module.css";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

// next
import Image from "next/image";

//react
import { useState } from "react";

// Assets
import Logo from "@/Assets/Images/logo.png";

// react codeblock
import { CodeBlock, dracula } from "react-code-blocks";

function GenerateAPIForm() {
  const [showForm, setShowForm] = useState(true);
  const [loading, setShowLoading] = useState(false);
  const [code, setCode] = useState(``);
  const [formData, setFormData] = useState({
    model_name: "",
    language: "",
    backend: "",
  });

  const generateAPI = async (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowLoading(true);
    const res = await fetch("http://127.0.0.1:8000/generate_api", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.text();
    setCode(data);
    setShowLoading(false);
  };

  return (
    <>
      <Container
        className={`d-flex justify-content-center align-items-center ${style.container}`}
        fluid
      >
        {showForm === true ? (
          <>
            <form
              id="generate-api-form"
              onSubmit={(e) => generateAPI(e)}
              className={`${style.form_container}`}
            >
              <Row className="d-flex justify-content-center align-items-center">
                <Image className={`${style.logo}`} src={Logo} alt="image" />
              </Row>
              <Row className={`${style.input_container}`}>
                <Col className="d-flex justify-content-center align-items-center">
                  <label>Model Name:</label>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  <input
                    value={formData.model_name}
                    onChange={(e) =>
                      setFormData({ ...formData, model_name: e.target.value })
                    }
                    className={`${style.form_input}`}
                    type="text"
                  />
                </Col>
              </Row>
              <Row className={`${style.input_container}`}>
                <Col className="d-flex justify-content-center align-items-center">
                  <label>Language/Framework:</label>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  <input
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className={`${style.form_input}`}
                    type="text"
                  />
                </Col>
              </Row>
              <Row className={`${style.input_container}`}>
                <Col className="d-flex justify-content-center align-items-center">
                  <label>Backend database:</label>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  <input
                    value={formData.backend}
                    onChange={(e) =>
                      setFormData({ ...formData, backend: e.target.value })
                    }
                    className={`${style.form_input}`}
                    type="text"
                  />
                </Col>
              </Row>
              <button className={`${style.submit_button}`} type="submit">
                Generate API
              </button>
            </form>
          </>
        ) : (
          <>
            {loading === true ? (
              <>
                <h1 className={`${style.loading_indicator}`}>Loading...</h1>
              </>
            ) : (
              <>
                <div
                  className={`${style.editor_container}`}
                  dangerouslySetInnerHTML={{ __html: code }}
                ></div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default GenerateAPIForm;
