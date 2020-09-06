import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import CarouselC from "../Components/Carousel";
import { Link } from 'react-router-dom';
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');

class Home extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			keyword: "",
			tags: []
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
        this.setState({
          keyword: event.target.value
        });
    }

	render(){
		let count=0;
		const displayTopBlogs = this.props.errMess === null? (
			this.props.blogs.map((blog) => {
				dayjs.extend(relativeTime);
				if(count<3){
					count=count+1;
					return(
					<Link to ={`/blogs/${blog.blogId}`} style={{ textDecoration: 'none', color: "black" }} key={blog.blogId} >
						<Container className="hover-decoration">
								<Row className="align-items-center">
									<Col xs="4" md="4"><img className="user-image" alt="user profile" src={blog.userImage}/></Col>
									<Col className="userimage-padding">
										<p>{blog.title}</p>
										<p><i> - {blog.userHandle}, {dayjs(blog.createdAt).fromNow()}</i></p>
									</Col>
								</Row>
								<hr/>
						</Container>
					</Link>
					);
				}
				else{
					return(<div></div>);
				}
			}
		)) :(<div> An error occured please try again </div>)

		function sortByFrequency(array) {
			var frequency = {};
			var sortAble = [];
			var newArr = [];

			array.forEach(function(value) { 
				if ( value in frequency )
					frequency[value] = frequency[value] + 1;
				else
					frequency[value] = 1;
			});
    

			for(var key in frequency){
				sortAble.push([key, frequency[key]])
			}

			sortAble.sort(function(a, b){
				return b[1] - a[1]
			})

    
			sortAble.forEach(function(obj){
				for(var i=0; i < obj[1]; i++){
					newArr.push(obj[0]);
				}
			})
			return newArr;
		}
		
		function uniq(a) {
			return a.filter(function(item, pos, ary) {
				return !pos || item !== ary[pos - 1];
			});
		}

		var newArr = [];

		if(this.props.errMess=== null && !this.props.isLoading){
			let tagList = [];
			tagList = this.props.blogs.map((blog) => {
					let tagt=[];
					tagt=blog.tags.split(",");
					return tagt;
				});

			for(var i = 0; i < tagList.length; i++)
			{
				newArr = newArr.concat(tagList[i]);
			}

			newArr = sortByFrequency(newArr);
			newArr = uniq(newArr);
		}
		let tagCnt=0;
		const displayTags = this.props.errMess === null? (
			newArr.map((elem) => {
				if(tagCnt<3){
					tagCnt++;
					return(
						<Col xs="12" md="12" className="hover-decoration">#{elem}</Col>
					);
				}
				else return(null);
			})
		) :(null);
		
		const displaySearchedBlogs = this.props.errMess === null? (
			this.props.blogs.map((blog) => {
				dayjs.extend(relativeTime);
				if(this.state.keyword!=="" && 
				(blog.title.search(this.state.keyword)!== -1 || 
				blog.userHandle.search(this.state.keyword)!== -1 || 
				blog.tags.search(this.state.keyword)!== -1 )){
					return(
						<Link to ={`/blogs/${blog.blogId}`} style={{ textDecoration: 'none', color: "black" }} key={blog.blogId} >
							<Container className="hover-decoration">
									<Row className="align-items-center">
										<Col xs="4" md="4"><img className="user-image" alt="user profile" src={blog.userImage}/></Col>
										<Col className="userimage-padding">
											<p>{blog.title}</p>
											<p><i> - {blog.userHandle}, {dayjs(blog.createdAt).fromNow()}</i></p>
										</Col>
									</Row>
									<hr/>
							</Container>
						</Link>
						);
				}
				else{
					return (<div></div>);
				}
			}
		)) :(<div>An error occured please try again</div>)
		
		const override = css`
		  margin-left: 40%;
		`;
		
		return(
		<Container>
			<Row>
				<Col><CarouselC/></Col>
			</Row>
			<Row >
				<Col className="blog-card"  xs="11" sm="11" md="7">
					<Row>
						<Col xs="2" md="1">
							<span className="fa fa-search fa-lg ml-4 mt-3"></span>
						</Col>
						<Col className="no-border">
							<input type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange}
                            className="form-control" placeholder="Search for blogs based on title, author or keyword.." />
						</Col>
					</Row>
					<hr/>
					<ScaleLoader
						css={override}
						color={"#5FB394"}
						loading={this.props.isLoading}
					/>
					{displaySearchedBlogs}
				</Col>
				<Col>
					<Row xs="11">
						<Col className="blog-card">
							<h3>Trending tags</h3>
							<hr/>
							<ScaleLoader
								css={override}
								color={"#5FB394"}
								loading={this.props.isLoading}
							/>
							{displayTags}
						</Col>
					</Row>
					<Row xs="11">
						<Col className="blog-card" >
							<h3>Top blogs of the week!</h3>
							<hr/>
							<ScaleLoader
								css={override}
								color={"#5FB394"}
								loading={this.props.isLoading}
							/>
							{displayTopBlogs}
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
		);
	}
}

export default Home;