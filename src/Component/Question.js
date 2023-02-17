import { useState } from "react";
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


export const Question = (props) => {
  const [items, setItems] = useState(props.items);

  return (
    <>
      <section id="questions" className="p-5">
        <div className="container">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <Accordion>
            {
              items.map((item, index) => {
                // console.log(item, "index" + index);
                return <><Accordion.Item eventKey={index}>

                  <Accordion.Header>{item.header}</Accordion.Header>
                  <Accordion.Body>
                    {item.body}
                    <div>
                      <Button id={item.header} onClick={props.itemEvent}>Click Me</Button>
                    </div>
                  </Accordion.Body>
                        </Accordion.Item></>
              })
            }
          </Accordion>
        </div>
      </section>
    </>
  )
}
