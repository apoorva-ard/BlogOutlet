import React, { Component } from 'react';
import { Carousel, CarouselIndicators, CarouselControl, CarouselItem, Media } from 'reactstrap';

const items = [
	{
		key: 1,
		color: "#2E97A3",
		caption: 'Slide 1',
		title: "WELCOME TO BLOG OUTLET!",
		subTitle: "Let the world hear you!",
		image:"/assets/images/logo.png"
	},
	{
		key: 2,
		color: "#5FB394",
		caption: 'Slide 2',
		title: "Design your blog with the help of our rich text editor!",
		subTitle: "",
		image:"/assets/images/write.jpg"
	},
	{
		key: 3,
		color: "#406BA3",
		caption: 'Slide 3',
		title: "View blogs from all over the world!",
		subTitle: "",
		image:"/assets/images/world.jpg"
	}
];

class CarouselC extends Component{

	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	render(){
		const slides = items.map((item) => {
			return (
				<CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.key}>
					<div style={{backgroundColor: item.color}} className="carousel-setup">
						<Media>
							<Media left middle>
								<Media object src={process.env.PUBLIC_URL + item.image} alt="abc" className="carousel-image-setup"/>
							</Media>
							<Media body className="carousel-body">
								<Media heading className="carousel-body-size">
									{item.title}
								</Media>
								{item.subTitle}
							</Media>
						</Media>
					</div>
				</CarouselItem>
			);
		});
		return(
			<Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
				<CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
				{slides}
				<CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
				<CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
			</Carousel>
		)
	}
}

export default CarouselC;