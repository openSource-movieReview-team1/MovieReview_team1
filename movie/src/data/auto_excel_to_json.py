import os
import time
import pandas as pd

excel_file = "movies.xlsx"
json_file = "movies.json"

base_dir = os.path.dirname(os.path.abspath(__file__))  # 현재 파일 기준
excel_path = os.path.join(base_dir, excel_file)
json_path = os.path.join(base_dir, json_file)

last_modified = None

while True:
    try:
        new_modified = os.path.getmtime(excel_path)
        if new_modified != last_modified:
            df = pd.read_excel(excel_path)
            df.to_json(json_path, orient="records", force_ascii=False, indent=2)
            print("✅ JSON 파일이 자동으로 업데이트되었습니다.")
            last_modified = new_modified
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
    time.sleep(3)
