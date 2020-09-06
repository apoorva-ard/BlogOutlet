import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../Components/EditorToolBar";
import "react-quill/dist/quill.snow.css";

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            body: "",
            tags: "",
            errors: {
                title: "Title must not be empty!",
                tags: "Provide atleast 1 tag!",
            }
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeT = this.handleChangeT.bind(this);
        
    }    

    handleChange(event) {
        let errors = this.state.errors; 
        this.setState({
          [event.target.name]: event.target.value
        });

        if(event.target.name === "title"){
            if(event.target.value.length < 1)
                errors.title = 'Title must not be empty!';
            else
                errors.title = '';

        }

        if(event.target.name === "tags"){
            if(event.target.value.length < 1)
                errors.tags = 'Provide atleast 1 tag!';
            else
                errors.tags = "";
        }

      }
      
      handleChangeT(value) {
        this.setState({
            body: value
        });
      }


     handleSubmit(event) {
         const reqState = ({
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags,         
         });
         if(this.state.errors.title.length<1 && this.state.errors.tags.length<1){
            this.props.postBlog(reqState);
            event.preventDefault();
         }
         else
            event.preventDefault();
     }
    
    render(){
        return (
            <Container className="topmargin-setup">
                <Row>
                    <Col xs="12" sm={{ size: 8, offset: 2 }}>
                        <center><p>Create your blog here!</p></center>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm={{size: 8, offset: 2} }>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    className="form-control"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors.title.length > 0 && 
                                <span className='error-display'>{this.state.errors.title}</span>}
                            </div>
                            <div className="form-group">
                                <EditorToolbar />
                                <ReactQuill
                                    theme="snow"
                                    value={this.state.body}
                                    onChange={this.handleChangeT}
                                    placeholder={"Your thoughts here..."}
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="tags"
                                    placeholder="Enter your tags separated by comma(,)"
                                    className="form-control"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors.tags.length > 0 && 
                                <span className='error-display'>{this.state.errors.tags}</span>}
                            </div>
                            <div>
                                <center><button type="submit" className="btn btn-info btn-lg"> Post </button></center>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Blog;