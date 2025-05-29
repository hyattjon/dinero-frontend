import matplotlib.font_manager as fm
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
font_path = '/Library/Fonts/latinmodern-math.otf' 
fm.fontManager.addfont(font_path)
plt.rcParams['font.family'] = 'Latin Modern Math'
import streamlit as st
import requests
import seaborn as sns
import json
import os
import subprocess
import sys


# Set page config
st.set_page_config(page_title="Dinero Dashboard", layout="wide")

# Title
st.title("Dinero Financial Dashboard")

# Top navigation using tabs (add "Dashboard" as the first tab)
tabs = st.tabs([
    "Dashboard", "Overview", "Spending Analysis", "Category Breakdown", 
    "Visualization", "Upload Data", "Spending Targets", "Classify Transactions"
])

# Use session state to persist data across tabs
if 'data' not in st.session_state:
    st.session_state['data'] = pd.DataFrame()

with tabs[5]:
    st.header("Upload Data")
    uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        st.session_state['data'] = df
        st.write(df.head())
        st.success("Data uploaded! You can now use it in other tabs.")

data = st.session_state['data']

with tabs[0]:
    st.header("Dashboard")
    st.write("Welcome to your Dinero Dashboard! Here you can see a quick summary of your finances.")

    if not data.empty:
        # Remove outliers: any spending more than $10,000 from the mean
        if 'amount' in data.columns:
            spending = data[data['amount'] < 0].copy()
            mean_spending = spending['amount'].mean()
            outlier_mask = (spending['amount'] < mean_spending - 10000) | (spending['amount'] > mean_spending + 10000)
            num_outliers = outlier_mask.sum()
            filtered_data = data.copy()
            filtered_data = filtered_data[~filtered_data.index.isin(spending[outlier_mask].index)]
            if num_outliers > 0:
                st.info(f"{num_outliers} outlier transaction(s) more than $10,000 from the mean were removed from all calculations and plots.")

        else:
            filtered_data = data
            num_outliers = 0

        # Example summary stats
        st.subheader("Summary Statistics")
        st.write(filtered_data.describe())

        # Example: total spending
        if 'amount' in filtered_data.columns:
            total_spending = filtered_data[filtered_data['amount'] < 0]['amount'].sum()
            st.metric("Total Spending", f"${abs(total_spending):,.2f}")

        # Example: most common category
        if 'category' in filtered_data.columns:
            top_category = filtered_data['category'].value_counts().idxmax()
            st.metric("Most Frequent Category", top_category)

        # Example: show recent transactions
        st.subheader("Recent Transactions")
        st.write(filtered_data.sort_values('date', ascending=False).head())
    else:
        st.info("No data loaded. Please upload a CSV file in the 'Upload Data' tab.")

with tabs[1]:
    st.header("Overview")
    if not data.empty:
        # Remove outliers
        if 'amount' in data.columns:
            spending = data[data['amount'] < 0].copy()
            mean_spending = spending['amount'].mean()
            outlier_mask = (spending['amount'] < mean_spending - 10000) | (spending['amount'] > mean_spending + 10000)
            filtered_data = data.copy()
            filtered_data = filtered_data[~filtered_data.index.isin(spending[outlier_mask].index)]
        else:
            filtered_data = data

        st.write("Browse your transactions below. Use the buttons to navigate pages (50 transactions per page).")

        # Pagination state
        if 'overview_page' not in st.session_state:
            st.session_state['overview_page'] = 0

        page_size = 50
        total_rows = len(filtered_data)
        total_pages = (total_rows - 1) // page_size + 1

        # Navigation buttons
        col1, col2, col3 = st.columns([1,2,1])
        with col1:
            if st.button("Previous", key="overview_prev") and st.session_state['overview_page'] > 0:
                st.session_state['overview_page'] -= 1
        with col3:
            if st.button("Next", key="overview_next") and st.session_state['overview_page'] < total_pages - 1:
                st.session_state['overview_page'] += 1

        # Display current page
        start = st.session_state['overview_page'] * page_size
        end = start + page_size
        st.write(f"Showing transactions {start + 1} to {min(end, total_rows)} of {total_rows}")

        # Show 50 transactions as a full table (not scrollable)
        page_df = filtered_data.sort_values('date', ascending=False).iloc[start:end].reset_index(drop=True)
        st.table(page_df)
        if 'amount' in data.columns:
            num_outliers = outlier_mask.sum()
            if num_outliers > 0:
                st.info(f"{num_outliers} outlier transaction(s) more than $10,000 from the mean were removed from this table.")
    else:
        st.write("Summary statistics, recent transactions, and key metrics go here.")

with tabs[2]:
    st.header("Spending Analysis")
    st.write("Visualizations and trends of your spending over time.")

    if not data.empty and 'date' in data.columns and 'amount' in data.columns:
        # Ensure 'date' is datetime
        if not pd.api.types.is_datetime64_any_dtype(data['date']):
            data['date'] = pd.to_datetime(data['date'], errors='coerce')

        # Remove outliers: any spending more than $10,000 from the mean
        spending = data[data['amount'] < 0].copy()
        mean_spending = spending['amount'].mean()
        outlier_mask = (spending['amount'] < mean_spending - 10000) | (spending['amount'] > mean_spending + 10000)
        num_outliers = outlier_mask.sum()
        filtered_spending = spending[~outlier_mask]

        # Group by date (monthly) and sum negative amounts (spending)
        spending_over_time = filtered_spending.groupby(pd.Grouper(key='date', freq='ME'))['amount'].sum().abs()

        st.line_chart(spending_over_time)
        st.dataframe(spending_over_time.rename("Total Spending ($)").reset_index())

        if num_outliers > 0:
            st.info(f"{num_outliers} outlier transaction(s) more than $10,000 from the mean were removed from this plot.")
    else:
        st.info("No data loaded or required columns missing. Please upload a CSV file with 'date' and 'amount' columns.")

with tabs[3]:
    st.header("Category Breakdown")
    st.write("Spending by category:")

    if not data.empty and 'category' in data.columns and 'amount' in data.columns:
        # Remove outliers: any spending more than $10,000 from the mean
        spending = data[data['amount'] < 0].copy()
        mean_spending = spending['amount'].mean()
        outlier_mask = (spending['amount'] < mean_spending - 10000) | (spending['amount'] > mean_spending + 10000)
        filtered_spending = spending[~outlier_mask]

        # Group by category and sum negative amounts (spending)
        spending_by_category = filtered_spending.groupby('category')['amount'].sum().abs().sort_values(ascending=False)
        st.bar_chart(spending_by_category)

        # Show table as well
        st.dataframe(spending_by_category.rename("Total Spending ($)").reset_index())

        num_outliers = outlier_mask.sum()
        if num_outliers > 0:
            st.info(f"{num_outliers} outlier transaction(s) more than $10,000 from the mean were removed from this plot.")
    else:
        st.info("No data loaded or required columns missing. Please upload a CSV file with 'category' and 'amount' columns.")

with tabs[4]:
    st.header("Visualization")
    st.write("Custom data visualizations go here.")

    # Search bar for natural language queries
    user_query = st.text_input("Describe the plot you want to see (e.g., 'Show spending by category for 2024'):")

    if user_query and not data.empty:
        # Prepare prompt for LLM
        prompt = (
            f"You are a Python data visualization assistant. Given the following pandas DataFrame called 'data' with columns: {list(data.columns)}, "
            f"write Python code using matplotlib or seaborn to create a plot based on this request: \"{user_query}\". "
            "Only return the code, do not include explanations or comments."
        )

        # Call local Ollama LLM API
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            }
        )
        if response.status_code == 200:
            code = response.json()["response"]
            # Remove any wrapping triple quotes from the generated code
            code = code.strip().strip("```").strip('"""').strip("'''")
            try:
                # Ensure 'date' is datetime
                if 'date' in data.columns and not pd.api.types.is_datetime64_any_dtype(data['date']):
                    data['date'] = pd.to_datetime(data['date'], errors='coerce')

                local_ns = {"data": data, "plt": plt, "pd": pd, "np": np}
                exec(code, {}, local_ns)
                st.pyplot(plt.gcf())
                plt.clf()
                st.code(code, language="python")
            except Exception as e:
                st.error(f"Error executing generated code: {e}")
        else:
            st.error("Failed to connect to the local LLM (Ollama). Make sure Ollama is running.")

    elif user_query:
        st.info("No data loaded. Please upload a CSV file in the 'Upload Data' tab.")

with tabs[6]:
    st.header("Spending Targets")

    # File to persist targets
    targets_file = "spending_targets.json"

    # Load existing targets
    if os.path.exists(targets_file):
        with open(targets_file, "r") as f:
            spending_targets = json.load(f)
    else:
        spending_targets = {}

    # Get available categories from the data
    if not data.empty and 'category' in data.columns:
        available_categories = sorted(data['category'].dropna().unique())
    else:
        available_categories = []

    # Add or update a target
    st.subheader("Set a Spending Target")
    selected_categories = st.multiselect("Category", available_categories)
    target = st.number_input("Monthly Spending Target ($)", min_value=0.0, step=100.0)
    if st.button("Save Target"):
        if selected_categories:
            for category in selected_categories:
                spending_targets[category] = target
            with open(targets_file, "w") as f:
                json.dump(spending_targets, f)
            st.success(f"Target for {', '.join(selected_categories)} saved!")

    # Show progress toward targets
    st.subheader("Progress Toward Targets")
    if not data.empty and 'category' in data.columns and 'amount' in data.columns:
        # Ensure 'date' is datetime
        if not pd.api.types.is_datetime64_any_dtype(data['date']):
            data['date'] = pd.to_datetime(data['date'], errors='coerce')

        # Group by year and month
        data['year_month'] = data['date'].dt.to_period('M').astype(str)
        months = sorted(data['year_month'].unique(), reverse=True)

        selected_month = st.selectbox("Select month to view summary:", months, index=0)

        month_mask = data['year_month'] == selected_month
        month_data = data[month_mask & (data['amount'] < 0)]

        st.markdown(f"### Spending Target Summary for {selected_month}")

        for cat, tgt in spending_targets.items():
            spent = abs(month_data[month_data['category'] == cat]['amount'].sum())
            st.metric(
                label=f"{cat} ({selected_month})",
                value=f"${spent:,.2f}",
                delta=f"${tgt - spent:,.2f} from target",
                delta_color="inverse" if spent > tgt else "normal"
            )
    else:
        st.info("No data loaded or required columns missing. Please upload a CSV file with 'category', 'amount', and 'date' columns.")

with tabs[7]:
    st.header("Classify Transactions")

    st.write("Upload a CSV of your transactions and classify them using AI categories. Once classified, the data will be used as your main dataset.")

    uploaded_classify = st.file_uploader("Upload a CSV to classify", type="csv", key="classify_upload")
    classify_status = st.empty()

    if uploaded_classify:
        # Save uploaded file to a temp location
        temp_path = "./new_data/to_classify.csv"
        os.makedirs("./new_data", exist_ok=True)
        with open(temp_path, "wb") as f:
            f.write(uploaded_classify.getbuffer())
        classify_status.info("File uploaded. Running classification...")

        # Run classify.py on the uploaded file
        try:
            python_exec = sys.executable  # This will be the venv's Python if Streamlit is run from the venv

            result = subprocess.run(
                [python_exec, "classify.py", temp_path],
                capture_output=True,
                text=True,
                check=True
            )
            classify_status.success("Classification complete! See 'classified_transactions.csv' in the new_data folder.")
            # Optionally, show the classified data
            classified_path = "./new_data/classified_transactions.csv"
            if os.path.exists(classified_path):
                classified_df = pd.read_csv(classified_path)
                st.write(classified_df.head())
                st.download_button(
                    "Download Classified CSV",
                    data=classified_df.to_csv(index=False),
                    file_name="classified_transactions.csv",
                    mime="text/csv"
                )
                # Set the classified data as the main data for the app
                st.session_state['data'] = classified_df
                st.success("Classified data is now loaded as your main dataset. You can use all dashboard features with this data.")
        except subprocess.CalledProcessError as e:
            classify_status.error(f"Classification failed: {e.stderr}")




"""
Monthly spending targets for each category out of our target goal
"""