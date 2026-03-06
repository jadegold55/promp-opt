from flask import Blueprint, request, jsonify
from app.promp_builder import build_prompt
from db.database import save_history, get_history
bp = Blueprint("routes",__name__)

@bp.route("/optimize", methods=['POST'])
def optimize_prompt():
   data =  request.get_json()
   if not data:
      return jsonify({"error": "no input was found"}), 400
   user_input = data.get("user_input")
   if not user_input:
     return jsonify({"error": "user_input is required"}), 400
   try:
     prompt = build_prompt(user_input)
   except Exception as e:
     return jsonify({"error": "something went wrong"}),500
   save_history(user_input=user_input,optimized_prompt=prompt)
   return jsonify({"optimized_prompt": prompt})

@bp.route("/history", methods=['GET'])
def get_all_history():
  return jsonify({"rows":get_history()})

  
  
