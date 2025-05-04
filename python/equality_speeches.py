# these lines are defined at the top of the jupyter notebook
# provided here for easier understanding
import json
import pandas as pd

# to load data containing topics
df = pd.read_pickle("data_topics_revised.pkl")

# ...

# iterate topics
for topic in topics_of_interest:
    topic_title = topics_of_interest[topic]

    if topic_title == "Gleichberechtigung":
        # get wanted data from wanted topic
        filtered_df = df[df["topic_distribution"].apply(lambda topics: topic in topics)]
        speeches_per_year = filtered_df.groupby("year").size()

        # prepare json object
        data_json = [
            {"year": int(year), "speeches_count": int(count)}
            for year, count in speeches_per_year.items()
        ]

        json_output = json.dumps(data_json, indent=2)
        print(json_output)
