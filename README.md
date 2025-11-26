# Random Fun Fact Viewer

A simple React + TypeScript app that displays one random fun fact at a time, changing every 2 seconds.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/interactive_frontend_work_req_2.git

2. Navigate into the project folder:

  cd interactive_frontend_work_req_2

3. Install dependencies:

  npm install

4. Start the development server:

  npm run dev

5. Open the URL shown in the console in a browser.

# How It Works

Fun facts are stored in public/funfacts.json.

The app uses useEffect to load the JSON data on mount.

Another useEffect sets a setInterval to pick a random fun fact every 2 seconds.

currentFact state holds the displayed fact, which updates automatically.

A simple CSS fade-in effect is added for better visuals.