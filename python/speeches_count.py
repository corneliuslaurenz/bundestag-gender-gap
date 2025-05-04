# these lines are defined at the top of the jupyter notebook
# provided here for easier understanding
import pandas as pd
import json

# to load data containing topics
df = pd.read_pickle("data_topics_revised.pkl")

# ...

# get total speeches per period
total_speeches_per_period = df.groupby("legislative_period").size()

# get total speeches per gender
speeches_by_gender = (
    df.groupby(["legislative_period", "speaker_gender"]).size().unstack(fill_value=0)
)

# fill object with values
speeches_by_gender["total_speeches"] = total_speeches_per_period
speeches_by_gender["percentage_woman_speeches"] = (
    speeches_by_gender["female"] / speeches_by_gender["total_speeches"] * 100
).round(2)
speeches_by_gender["percentage_man_speeches"] = (
    speeches_by_gender["male"] / speeches_by_gender["total_speeches"] * 100
).round(2)

# prepare for json format
json_data = (
    speeches_by_gender.reset_index()
    .rename(
        columns={
            "legislative_period": "legislative_period",
            "total_speeches": "total_speeches",
            "female": "total_woman_speeches",
            "percentage_woman_speeches": "percentage_woman_speeches",
            "male": "total_man_speeches",
            "percentage_man_speeches": "percentage_man_speeches",
        }
    )
    .to_dict(orient="records")
)
json_output = json.dumps(json_data, indent=4)

print(json_output)
