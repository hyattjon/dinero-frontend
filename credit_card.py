import streamlit as st
import pandas as pd
import os
import subprocess
import sys

st.set_page_config(page_title="Credit Card Recommender", layout="wide")
st.title("Credit Card Recommender")

st.write("Upload your transactions CSV and get a recommendation for the best credit card based on your spending patterns.")

# Upload transactions CSV
uploaded_file = st.file_uploader("Upload your transactions CSV", type="csv")
if uploaded_file:
    transactions = pd.read_csv(uploaded_file)
    # Check if 'category' column exists
    if 'category' not in transactions.columns:
        st.info("No 'category' column found. Running classification to generate categories...")
        # Save uploaded file to a temp location
        temp_path = "./to_classify.csv"
        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
        try:
            python_exec = sys.executable
            result = subprocess.run(
                [python_exec, "../classify.py", temp_path],
                capture_output=True,
                text=True,
                check=True
            )
            classified_path = "./new_data/classified_transactions.csv"
            if os.path.exists(classified_path):
                transactions = pd.read_csv(classified_path)
                st.success("Classification complete! Categories added.")
            else:
                st.error("Classification failed: classified_transactions.csv not found.")
        except subprocess.CalledProcessError as e:
            st.error(f"Classification failed: {e.stderr}")
    else:
        st.success("Transactions loaded!")
    st.write(transactions.head())
else:
    st.info("Please upload a CSV file with at least 'amount', 'date', and 'category' columns.")

# Load credit card cashback CSV from file (no upload needed)
cc_file_path = "credit_card_cashback.csv"
try:
    cc_df = pd.read_csv(cc_file_path)
    st.success("Credit card cashback info loaded from credit_card_cashback.csv!")
    st.write(cc_df.head())
except Exception as e:
    cc_df = None
    st.error(f"Could not load credit_card_cashback.csv: {e}")

if uploaded_file and cc_df is not None and 'category' in transactions.columns:
    # Only consider negative amounts as spending
    spending = transactions[transactions['amount'] < 0].copy()

    # Calculate total cashback for each credit card
    results = []
    for card in cc_df['credit_card'].unique():
        card_cats = cc_df[cc_df['credit_card'] == card]
        total_cashback = 0.0
        for _, row in card_cats.iterrows():
            cat = row['category']
            percent = row['cashback_percent']
            cat_spending = spending[spending['category'] == cat]['amount'].sum()
            cashback = abs(cat_spending) * (percent / 100)
            total_cashback += cashback
        results.append({'credit_card': card, 'total_cashback': round(total_cashback, 2)})

    cashback_df = pd.DataFrame(results)
    cashback_df = cashback_df.sort_values('total_cashback', ascending=False)

    st.subheader("Estimated Cashback by Card")
    st.table(cashback_df)

    # Recommend the best card
    if not cashback_df.empty:
        best_card = cashback_df.iloc[0]
        st.success(f"Recommended Card: **{best_card['credit_card']}**\n\nEstimated Annual Cashback: **${best_card['total_cashback']:,.2f}**")