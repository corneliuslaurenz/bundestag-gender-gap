# these lines are defined at the top of the jupyter notebook
# provided here for easier understanding
import json
import pandas as pd

# to load data containing topics
df = pd.read_pickle("data_topics_revised.pkl")

# ...

all_topic_data = {}

# iterate topics
for topic in topics_of_interest:
    topic_title = topics_of_interest[topic]

    # get wanted data from every topic
    filtered_df = df[df["topic_distribution"].apply(lambda topics: topic in topics)]
    speeches_per_year = filtered_df.groupby("year").size()
    grouped_df = (
        filtered_df.groupby(["year", "speaker_gender"])
        .size()
        .unstack(level=1)
        .fillna(0)
    )

    topic_data = {}

    # iterate years and get wanted data for each gender
    for year in speeches_per_year.index:
        total = speeches_per_year.loc[year]
        female_count = (
            grouped_df.loc[year, "female"] if "female" in grouped_df.columns else 0
        )
        male_count = grouped_df.loc[year, "male"] if "male" in grouped_df.columns else 0

        # prepare json objekt
        topic_data[int(year)] = {
            "female_percentage": (
                round((female_count / total) * 100, 2) if total > 0 else 0
            ),
            "male_percentage": (
                round((male_count / total) * 100, 2) if total > 0 else 0
            ),
        }

    # add topic to result object
    all_topic_data[topic_title] = topic_data


print(json.dumps(all_topic_data, indent=2))
