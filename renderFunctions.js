import * as utils from './utils.js';

export function makeNavHeader() {
    return `
      <button class="nav__header_btns" id="homeBtn">home</button>
      <button class="nav__header_btns" id="portfolioBtn">portfolio</button>
      <button class="nav__header_btns" id="merchBtn">merch</button>
      <button class="nav__header_btns" id="blogBtn">blog</button>
    `
};

export function makeHomePage(blank) {
    return `
        <dialog id="tip"><strong></strong> <span id="tip-txt"></span></dialog>
        <main class="home__page">
            <section class="welcome__text">
                <figure>
                    <img class="cover__image" src="public/cjatsakura.webp" alt="An AI altered picture of CJ, aka E•M, by a cherry tree." />
                    </figure>
                <!-- <h1>Æinär's Library</h1> -->
                <p class="about-blurb">
                    Aspiring game developer; WIP web developer; RPG hobbyist. 
                </p>
            </section>

            <section>
                <br />
                <div class="icon__holder">
                    <div class="icons">
                    <a
                        href="https://aka-em.itch.io/"
                        target="_blank"
                        class="fa-brands fa-itch-io"
                    ></a>
                    </div>

                    <div class="icons">
                    <a
                        href="https://github.com/einar-method"
                        target="_blank"
                        class="fa fa-github"
                    ></a>
                    </div>
                    <div class="icons">
                    <a
                        href="https://travelingbardgames.substack.com/"
                        target="_blank"
                        class="fa fa-rss"
                    ></a>
                    </div>
                    <div class="icons">
                    <a
                        href="https://open.spotify.com/track/1GGLQhjZSB6h0Qkfu2OvAf?si=4cafaec035cb4ed6"
                        class="fa-brands fa-spotify"
                        target="_blank"
                    ></a>
                    </div>
                    <div class="icons">
                    <a
                        href="https://ordes.netlify.app/"
                        class="fa-solid fa-globe"
                        target="_blank"
                    ></a>
                    </div>
                    <div class="icons">
                    <a
                        href="https://buymeacoffee.com/em.bmc"
                        class="fa-solid fa-mug-hot"
                        target="_blank"
                    ></a>
                    </div>
                </div>
                <br />
            </section>
            <section class="endPage__navigation">
                <div class="endPage__navigation_left" id="toBlogBtn">
                    <a class="fa-solid fa-arrow-turn-down fa-rotate-90"></a>
                    <p>check out short stories and more on the blog</p>
                </div>
                <div class="endPage__navigation_right" id="toPortfolioBtn">
                    <p>see some of my apps and projects in portfolio</p>
                    <a class="fa-solid fa-arrow-right-long"></a>
                </div>
            </section>
        </main>
    `;
};

function createPortfolioItems(dataIn) {
    return `
      <ul class="portfolio__list">
        ${dataIn.portfolio.map(portfolio => `
          <li class="blog__post" id="portfolioItem${portfolio.id}">
            <h3>${portfolio.title}</h3>
            <p>${portfolio.description}</p>
            <p>Click to see more</p>
          </li>
        `).join('')}
      </ul>
    `;
};
  
export function makePortfolioPage(dataIn) {
    return `
        <dialog id="tip"><strong></strong> <span id="tip-txt"></span></dialog>
        <main id="folioGrid">
        <section class="innerGrid">
            ${createPortfolioItems(dataIn)}
        </section>
        <section class="endPage__navigation">
            <div class="endPage__navigation_left" id="toHomeBtn">
            <a class="fa-solid fa-arrow-left-long"></a>  
            <p>find my links on the homepage</p>
            </div>
            <div class="endPage__navigation_right" id="toMerchBtn">
            <p>check out free and pwyw stuff in the store!</p>
            <a class="fa-solid fa-arrow-right-long"></a>
            </div>
        </section>
        </main>
    `;
};
  
function createMerchItems(dataIn) {
    return `
        <ul class="merchList">
        ${dataIn.merch.map(merch => `
            <li class="merchCard" id="merchItem${merch.id}">
            <h3>${merch.title}</h3>
            <img src="${merch.imageLink}" alt="${merch.imageAlt}">
            <p>${merch.description}</p>
            <a class="merchBtn" href="${merch.actionLink}" target="_blank">${merch.actionType}</a>
            <a href="${merch.mainLink}" target="_blank">${merch.mainLinkText}</a>
            </li>
        `).join('')}
        </ul>
    `;
};
  
export function makeMerchPage(dataIn) {
    return `
      <dialog id="tip"><strong></strong> <span id="tip-txt"></span></dialog>
      <main id="itchGrid">
        <section class="innerGrid">
          ${createMerchItems(dataIn)}
        </section>
        <section class="endPage__navigation">
          <div class="endPage__navigation_left" id="toPortfolioBtn">
            <a class="fa-solid fa-arrow-left-long"></a>  
            <p>see some of my apps and projects in portfolio</p>
          </div>
          <div class="endPage__navigation_right" id="toBlogBtn">
            <p>check out short stories and more on the blog</p>
            <a class="fa-solid fa-arrow-right-long"></a>
          </div>
        </section>
      </main>
    `;
};
  
export function makeBlogPage(blogIn) {
    return `
      <main class="blog__page" id="blogPage">
        ${makeBlogSections()}
        ${blogPost(blogIn)}
        <section class="endPage__navigation">
          <div class="endPage__navigation_left" id="toMerchBtn">
            <a class="fa-solid fa-arrow-left-long"></a>  
            <p>check out free and pwyw stuff in the store!</p>
          </div>
          <div class="endPage__navigation_right" id="toHomeBtn">
            <p>find my links on the homepage</p>
            <a class="fa-solid fa-tent-arrow-turn-left fa-flip-horizontal"></a>
          </div>
        </section>
      </main>
    `;
};

function blogPost(dataIn) {
    //console.log(dataIn.blog)
    return `
      <section class="blog__section">
          ${dataIn.blog.map(post => `
            <article class="blog__post" id="blogID${post.id}">
              <h2 class="blog__header">${post.title}</h2>
              <h3 class="blog__subheader">${post.subtitle}</h3>
              <p class="blog__paragraph">${utils.truncateToWords(post.content)}</p>
              <p class="blog__date">Date: ${post.postDate}</p>
            </article>
          `).join('')}
      </section>
    `;
};
  
function makeBlogSections() {
    return `
      <div class="blog__section_tab_holder_outer">
        <div id="blogSectionTab" class="blog__section_tab_holder_inner">
          <fieldset 
              id="tab-toggle" 
              class="blog__section_tab_options" 
          >
  
          <p>
              <input 
              type="radio" 
              name="tool-toggle" 
              id="storiesTab" 
              value="storiesTab"
              class="tool-toggle"
              checked>
              <label for="storiesTab">stories</label>
          </p>
  
          <p>
              <input 
              type="radio" 
              name="tool-toggle" 
              id="musingsTab" 
              value="musingsTab"
              class="tool-toggle">
              <label for="musingsTab">musings</label>
          </p>
          <p>
              <input 
              type="radio" 
              name="tool-toggle" 
              id="gamesTab" 
              value="gamesTab"
              class="tool-toggle">
              <label for="gamesTab">games</label>
          </p>
          </fieldset>
        </div>
      </div>
    `
};