import pandas as pd
import numpy as np

# Load in the new transactions data
def classify(path: str = './new_data/Checking1.csv') -> pd.DataFrame:
    """
    Classify transactions based on their descriptions.
    
    Args:
        path (str): Path to the CSV file containing transactions.
        
    Returns:
        pd.DataFrame: DataFrame with classified transactions.
    """

    transactions = pd.read_csv(path, header=None)
    transactions.drop(columns=[2,3], inplace=True) 
    transactions.rename(columns={0: 'date', 1: 'amount', 4: 'description'}, inplace=True)

    # Convert date column to datetime
    transactions['date'] = pd.to_datetime(transactions['date'], errors='coerce')

    # Classify the transactions based on keywords
    from transformers import pipeline

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

    labels = [
        "rent", "groceries", "phone bills", "gas bill", "eating out",
        "school fees", "electric bill", "gas for car", "insurance"
    ]

    def classify_description(desc: str) -> str:
        result = classifier(desc, candidate_labels=labels)
        return result['labels'][0]  # Most likely category

    transactions['category'] = transactions['description'].apply(classify_description)

    # Save the classified transactions to a new CSV file, with date formatted as ISO
    transactions['date'] = transactions['date'].dt.strftime('%Y-%m-%d')
    transactions.to_csv(f'./new_data/classified_transactions.csv', index=False)

    return transactions

if __name__ == "__main__":
    import sys
    path = sys.argv[1] if len(sys.argv) > 1 else './new_data/Checking1.csv'
    print("Classifying transactions...")
    classify(path)
    print("Transactions classified and saved to 'classified_transactions.csv'.")
    