const stock_blog_post_prompt = `Generate a detailed blog post in JSON format that captures the essence of the latest developments in the stock market. The blog post should include:

Title: Craft a catchy title that encapsulates the essence of the current stock market trends, focusing on significant uptrends and potential growth areas that might not yet be in the mainstream spotlight.
Introduction: Provide a brief overview of the current state of the stock market, highlighting key performance indicators such as the S&P 500, Dow Jones, and Nasdaq indexes. Mention any overarching trends affecting the market, such as economic policies, global events, or technological advancements.
Main Content:
Key Performers: Identify stocks or sectors experiencing significant uptrends, with a brief analysis of what's driving their performance.
Silent Horses: Spotlight emerging opportunities or undervalued sectors that have the potential for growth but are currently under the radar. Explain why these opportunities are promising based on market data, expert opinions, or industry trends.
Expert Insights: Incorporate opinions or quotes from financial experts or analysts on the current market trends and future outlook. This could include insights from recent earnings calls, financial reports, or market analysis articles.
Visual Elements: Suggest including visual elements such as charts or graphs that illustrate the trends discussed. Provide URLs to high-quality, relevant images or suggest creating custom graphics that represent the data effectively.
Conclusion: Summarize the key points discussed, offering a forward-looking perspective on the stock market. Provide actionable insights or recommendations for investors based on the analysis presented in the content.
References: List sources of information, expert opinions, or data used to compile the blog post. Ensure credibility and reliability by citing reputable financial news outlets, market analysis reports, or official company documents.
The output should be structured as a JSON object, including 'title', 'content', and 'references' keys, ensuring the information is comprehensive yet concise, and tailored for an audience interested in stock market investments and trends.`;

const latest_sports_post_prompt = `Generate a detailed blog post in JSON format that captures the essence of the latest developments in American sports. The blog post should include:

Title: Craft a catchy title that encapsulates the essence of the current sports season, focusing on recent playoff wins, player updates, and other significant events.
Introduction: Provide a brief overview of the current sports landscape across major leagues such as the NBA, NFL, MLB, and NHL. Highlight any recent playoff results, major upsets, or standout performances.
Main Content:
Playoff Updates: Provide detailed updates on recent playoff games, including winning teams, key performances, and any records broken.
Player News: Discuss significant player news such as injuries, trades, or awards. Include updates on top players and rising stars.
Emerging Teams: Spotlight teams that are unexpectedly performing well this season. Provide insights into what's driving their success and potential challenges they might face in upcoming matches.
Expert Opinions: Incorporate opinions or quotes from sports analysts or commentators on the current trends and future projections for the leagues. This could include insights from post-game analyses, press conferences, or exclusive interviews.
Visual Elements: Suggest including visual elements such as photographs, team logos, or infographics that highlight the key points discussed. Provide URLs to high-quality, relevant images or suggest creating custom graphics that represent the data effectively.
Conclusion: Summarize the key points discussed, offering a forward-looking perspective on the rest of the season. Provide predictions or recommendations for fans to watch in upcoming games.
References: List sources of information, expert opinions, or data used to compile the blog post. Ensure credibility and reliability by citing reputable sports news outlets, official league announcements, or accredited sports analysis platforms.
The output should be structured as a JSON object, including 'title', 'content', and 'references' keys, ensuring the information is comprehensive yet concise, and tailored for an audience interested in American sports and league developments.`;
