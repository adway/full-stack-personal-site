import React, { Component } from 'react';

class Landing extends Component {
	render() {
		return (
			<div>
				<section className="hero is-dark is-bold is-medium">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">about me</h1>
							<h2 className="subtitle">
								I like to do research, take pictures, read, and code.
							</h2>
						</div>
					</div>
				</section>
				<section className="section" style={{ backgroundColor: '#505052' }}>
					<div className="container">
						<div className="columns">
							<div className="column has-text-white">
								<p className="standard">
									Hi! I'm Adway. I love to learn and do research. Most of all, I
									love to teach. I am interested in studying economics and would
									like an academic career in quantitative social policy in the
									future. In my free time, I like learning about new
									technologies, although I'm not particularly interested in
									engineering or computer science. Feel free to view my résumé{' '}
									<a
										href="https://www.dropbox.com/s/bauveclugcescao/Resume.docx?dl=0"
										target="_blank"
										rel="noopener noreferrer"
									>
										here
									</a>.
								</p>
								<p className="standard">
									I'm currently a sophomore at{' '}
									<a
										href="http://stjohnshigh.org"
										rel="noopener noreferrer"
										target="_blank"
									>
										Saint John's High School
									</a>{' '}
									in Shrewsbury, Massachusetts. I am a member of the Politics
									Club, French Club, and Homework Helpers Club. I am also the
									president of the Economics/Stock club. In my free time, I like
									to learn about economics, read the news and take pictures with
									my Canon Rebel T5.
								</p>
								<p className="standard">
									I also volunteer at the{' '}
									<a
										href="https://westboroughlandtrust.org/"
										rel="noopener noreferrer"
										target="_blank"
									>
										Westborough Community Land Trust
									</a>{' '}
									and I am part of the{' '}
									<a
										href="http://www.westboroughhistory.org/"
										rel="noopener noreferrer"
										target="_blank"
									>
										Westborough Historical Society
									</a>. I intern at the{' '}
									<a
										href="http://edc.town.westborough.ma.us"
										rel="noopener noreferrer"
										target="_blank"
									>
										Town of Westborough, Economic Development Committee
									</a>, and I am a contributing writer for the
									<a
										href="http://communityadvocate.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										{' '}
										Community Advocate Newspaper
									</a>. Finally, since I hope to pursue a career in academia, I
									like to work on various research projects in the area of
									social sciences. You can view them all{' '}
									<a href="/projects">here</a>. Most of the projects that I do
									are for science fairs, but I do submit projects to various
									conferences as well.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Landing;
