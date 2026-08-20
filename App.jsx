import React, { useState, useMemo } from "react";

const RAW_DATA = {"MSRIT": {"AERO SPACE ENGINEERING": {"1G": 8598, "2AG": 8418, "2BG": 11807, "3AG": 5465, "3BG": 5231, "GM": 5231, "GMK": 9556, "GMR": 7333, "S1G": 44499, "S2G": 24460, "S3G": 18767, "S4G": null, "STG": null}, "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE": {"1G": null, "2AG": 5985, "2BG": 6357, "3AG": 3991, "3BG": 2722, "GM": 2722, "GMK": null, "GMR": 6189, "S1G": 16733, "S2G": 22886, "S3G": null, "S4G": null, "STG": 14143}, "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING": {"1G": 3129, "2AG": 5833, "2BG": 7073, "3AG": 6175, "3BG": 2379, "GM": 2379, "GMK": null, "GMR": 4927, "S1G": 24284, "S2G": 15760, "S3G": null, "S4G": null, "STG": 8322}, "BIO-TECHNOLOGY": {"1G": null, "2AG": 14182, "2BG": 16780, "3AG": 13946, "3BG": 9294, "GM": 9294, "GMK": null, "GMR": 14033, "S1G": 25428, "S2G": 33571, "S3G": 37106, "S4G": null, "STG": null}, "CHEMICAL ENGINEERING": {"1G": 44236, "2AG": 37272, "2BG": 42086, "3AG": 19522, "3BG": 17707, "GM": 17707, "GMK": null, "GMR": 35166, "S1G": 95351, "S2G": 126522, "S3G": null, "S4G": null, "STG": null}, "CIVIL ENGINEERING": {"1G": 36552, "2AG": 42414, "2BG": 42705, "3AG": 26647, "3BG": 22396, "GM": 22396, "GMK": null, "GMR": 39718, "S1G": 37480, "S2G": 32459, "S3G": null, "S4G": null, "STG": null}, "COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)": {"1G": 2802, "2AG": 5151, "2BG": 14343, "3AG": 5598, "3BG": 2038, "GM": 2038, "GMK": null, "GMR": 4605, "S1G": 13687, "S2G": 10625, "S3G": null, "S4G": null, "STG": 11218}, "COMPUTER SCIENCE AND ENGINEERING": {"1G": 2508, "2AG": 4541, "2BG": 8053, "3AG": 2227, "3BG": 2360, "GM": 1663, "GMK": 7543, "GMR": 4030, "S1G": 14010, "S2G": 10248, "S3G": null, "S4G": null, "STG": 8920}, "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)": {"1G": 4259, "2AG": 5753, "2BG": 8783, "3AG": 10186, "3BG": 2523, "GM": 2523, "GMK": null, "GMR": 4409, "S1G": 14924, "S2G": 13335, "S3G": null, "S4G": null, "STG": 9858}, "ELECTRICAL & ELECTRONICS ENGINEERING": {"1G": 21215, "2AG": 19495, "2BG": 34276, "3AG": 21253, "3BG": 7405, "GM": 7405, "GMK": null, "GMR": 19911, "S1G": 35506, "S2G": 58834, "S3G": null, "S4G": null, "STG": null}, "ELECTRONICS AND COMMUNICATION ENGG": {"1G": 5195, "2AG": 4968, "2BG": 13296, "3AG": 5458, "3BG": 2270, "GM": 2270, "GMK": null, "GMR": 4914, "S1G": 34077, "S2G": 19822, "S3G": null, "S4G": null, "STG": 14537}, "ELECTRONICS AND INSTRUMENTATION ENGINEERING": {"1G": 22232, "2AG": 17889, "2BG": null, "3AG": 11484, "3BG": 6573, "GM": 6573, "GMK": null, "GMR": 15506, "S1G": 75575, "S2G": 47270, "S3G": 31615, "S4G": null, "STG": null}, "ELECTRONICS AND TELECOMMUNICATION ENGINEERING": {"1G": null, "2AG": 11622, "2BG": null, "3AG": 5834, "3BG": 4633, "GM": 4633, "GMK": null, "GMR": 13565, "S1G": 23278, "S2G": 34950, "S3G": 22004, "S4G": null, "STG": 21061}, "INDUSTRIAL ENGINEERING & MANAGEMENT": {"1G": 29507, "2AG": 37099, "2BG": null, "3AG": 27271, "3BG": 20788, "GM": 20788, "GMK": null, "GMR": 40459, "S1G": 198007, "S2G": 76025, "S3G": null, "S4G": null, "STG": null}, "INFORMATION SCIENCE AND ENGINEERING": {"1G": 6265, "2AG": 5528, "2BG": 13914, "3AG": 9022, "3BG": 2963, "GM": 2963, "GMK": null, "GMR": 5987, "S1G": 29309, "S2G": 21457, "S3G": 15593, "S4G": 35460, "STG": 10820}, "MECHANICAL ENGINEERING": {"1G": 23541, "2AG": 21834, "2BG": 32545, "3AG": 12875, "3BG": 12121, "GM": 12121, "GMK": null, "GMR": 31854, "S1G": 81980, "S2G": 47524, "S3G": 48880, "S4G": null, "STG": 37755}, "MEDICAL ELECTRONICS ENGINEERING": {"1G": 45593, "2AG": 41510, "2BG": 33370, "3AG": 65149, "3BG": 24452, "GM": 24452, "GMK": null, "GMR": 56441, "S1G": 74148, "S2G": 42597, "S3G": 98938, "S4G": null, "STG": null}}, "RVCE": {"AERO SPACE ENGINEERING": {"1G": 8562, "1K": 61857, "1R": null, "2AG": 5196, "2AK": null, "2AR": null, "2BG": null, "2BK": null, "2BR": null, "3AG": 5677, "3AK": null, "3AR": null, "3BG": 3611, "3BK": null, "3BR": null, "GM": 1903, "GMK": null, "GMR": 6082, "S1G": 5452, "S1K": null, "S1R": null, "S2G": 6944, "S2K": null, "S2R": 16361, "S3G": null, "S3R": null, "S4G": null, "STG": null, "STR": null}, "BIO-TECHNOLOGY": {"1G": 8501, "1K": null, "1R": null, "2AG": 12300, "2AK": null, "2AR": null, "2BG": 15117, "2BK": null, "2BR": null, "3AG": 57406, "3AK": null, "3AR": null, "3BG": 9159, "3BK": null, "3BR": null, "GM": 5960, "GMK": null, "GMR": 8233, "S1G": 26975, "S1K": null, "S1R": null, "S2G": 17370, "S2K": null, "S2R": 11849, "S3G": null, "S3R": null, "S4G": null, "STG": null, "STR": 50583}, "CHEMICAL ENGINEERING": {"1G": null, "1K": null, "1R": null, "2AG": 17662, "2AK": null, "2AR": null, "2BG": 14160, "2BK": null, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": null, "3BK": null, "3BR": null, "GM": 8424, "GMK": 52829, "GMR": 17670, "S1G": 99524, "S1K": null, "S1R": null, "S2G": 42143, "S2K": null, "S2R": null, "S3G": null, "S3R": null, "S4G": null, "STG": null, "STR": 126513}, "CIVIL ENGINEERING": {"1G": 18597, "1K": null, "1R": 36334, "2AG": 10248, "2AK": null, "2AR": null, "2BG": 19486, "2BK": null, "2BR": null, "3AG": 10529, "3AK": null, "3AR": null, "3BG": 12689, "3BK": null, "3BR": null, "GM": 8060, "GMK": 11573, "GMR": 23232, "S1G": 15563, "S1K": null, "S1R": null, "S2G": 40280, "S2K": null, "S2R": null, "S3G": 28093, "S3R": null, "S4G": null, "STG": null, "STR": null}, "COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)": {"1G": 1129, "1K": null, "1R": 2963, "2AG": 1408, "2AK": 3670, "2AR": 2670, "2BG": 2221, "2BK": null, "2BR": null, "3AG": 770, "3AK": null, "3AR": null, "3BG": 803, "3BK": 1314, "3BR": null, "GM": 492, "GMK": 1221, "GMR": 1289, "S1G": 6694, "S1K": null, "S1R": 14929, "S2G": 6196, "S2K": null, "S2R": 15538, "S3G": 4405, "S3R": null, "S4G": null, "STG": 2963, "STR": null}, "COMPUTER SCIENCE AND ENGINEERING": {"1G": 791, "1K": null, "1R": 1692, "2AG": 1228, "2AK": 1638, "2AR": 1359, "2BG": 2135, "2BK": null, "2BR": 2193, "3AG": 417, "3AK": null, "3AR": 915, "3BG": 550, "3BK": 1931, "3BR": 998, "GM": 322, "GMK": 1194, "GMR": 724, "S1G": 2982, "S1K": null, "S1R": 8442, "S2G": 5373, "S2K": 6277, "S2R": 6245, "S3G": 4163, "S3R": 6221, "S4G": 4220, "STG": 2304, "STR": 4494}, "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)": {"1G": 1750, "1K": null, "1R": 2740, "2AG": 1905, "2AK": null, "2AR": null, "2BG": 2406, "2BK": null, "2BR": null, "3AG": 1418, "3AK": 4240, "3AR": 2206, "3BG": 1008, "3BK": null, "3BR": null, "GM": 579, "GMK": null, "GMR": 1910, "S1G": 10939, "S1K": null, "S1R": null, "S2G": 5059, "S2K": null, "S2R": null, "S3G": 9371, "S3R": null, "S4G": null, "STG": null, "STR": null}, "COMPUTER SCIENCE AND ENGINEERING(DATA SCIENCE)": {"1G": 2221, "1K": null, "1R": null, "2AG": 1660, "2AK": null, "2AR": 2999, "2BG": 2547, "2BK": 7337, "2BR": null, "3AG": 1040, "3AK": null, "3AR": null, "3BG": 1142, "3BK": null, "3BR": null, "GM": 554, "GMK": null, "GMR": 1941, "S1G": 8569, "S1K": null, "S1R": null, "S2G": 6910, "S2K": null, "S2R": null, "S3G": 9035, "S3R": 14561, "S4G": null, "STG": null, "STR": null}, "ELECTRICAL & ELECTRONICS ENGINEERING": {"1G": 4350, "1K": null, "1R": null, "2AG": 5275, "2AK": null, "2AR": null, "2BG": 46005, "2BK": null, "2BR": null, "3AG": 1743, "3AK": null, "3AR": null, "3BG": 2759, "3BK": null, "3BR": null, "GM": 1249, "GMK": null, "GMR": 5830, "S1G": 25587, "S1K": null, "S1R": null, "S2G": 25750, "S2K": null, "S2R": null, "S3G": 17387, "S3R": null, "S4G": null, "STG": 34727, "STR": null}, "ELECTRONICS AND COMMUNICATION ENGG": {"1G": 2767, "1K": null, "1R": 4439, "2AG": 1946, "2AK": 6089, "2AR": 3678, "2BG": 3807, "2BK": null, "2BR": 6355, "3AG": 1325, "3AK": null, "3AR": null, "3BG": 1436, "3BK": 3287, "3BR": null, "GM": 647, "GMK": 4195, "GMR": 2279, "S1G": 10104, "S1K": 69934, "S1R": 20335, "S2G": 10917, "S2K": null, "S2R": 15313, "S3G": 8399, "S3R": 25817, "S4G": null, "STG": 4398, "STR": null}, "ELECTRONICS AND TELECOMMUNICATION ENGINEERING": {"1G": 4758, "1K": null, "1R": 6962, "2AG": null, "2AK": 3325, "2AR": 18088, "2BG": 3485, "2BK": 2092, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": null, "3BK": 1784, "3BR": null, "GM": null, "GMK": 742, "GMR": null, "S1G": 3416, "S1K": 18027, "S1R": null, "S2G": 67149, "S2K": 11978, "S2R": null, "S3G": null, "S3R": 43110, "S4G": null, "STG": null, "STR": 6962}, "INDUSTRIAL ENGINEERING & MANAGEMENT": {"1G": null, "1K": null, "1R": null, "2AG": 21555, "2AK": 31720, "2AR": 26631, "2BG": null, "2BK": null, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": 16977, "3BK": null, "3BR": null, "GM": 12309, "GMK": 30246, "GMR": 30608, "S1G": 100201, "S1K": null, "S1R": 291229, "S2G": 72879, "S2K": null, "S2R": null, "S3G": 38949, "S3R": null, "S4G": null, "STG": 41112, "STR": null}, "MECHANICAL ENGINEERING": {"1G": 10638, "1K": null, "1R": null, "2AG": 8121, "2AK": null, "2AR": 18572, "2BG": 15713, "2BK": null, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": 5448, "3BK": 18240, "3BR": null, "GM": 4166, "GMK": 22822, "GMR": 18041, "S1G": 55338, "S1K": null, "S1R": null, "S2G": 30747, "S2K": 145163, "S2R": 107022, "S3G": 24181, "S3R": null, "S4G": null, "STG": 18215, "STR": null}}, "PES": {"B.TECH IN BIO-TECHNOLOGY": {"1G": null, "1K": null, "1R": null, "2AG": null, "2AK": null, "2AR": null, "2BG": null, "2BK": null, "2BR": null, "3AG": 8771, "3AK": null, "3AR": null, "3BG": 5470, "3BK": null, "3BR": null, "GM": 8975, "GMK": null, "GMR": 27554, "S1G": 54774, "S1K": null, "S1R": 106478, "S2G": 34910, "S2K": null, "S2R": null, "S3G": 36221, "S3R": null, "S4G": 121576, "STG": 41917, "STK": null, "STR": null}, "B.TECH IN COMPUTER SCIENCE & ENGINEERING (AI & ML)": {"1G": 4093, "1K": 9811, "1R": 7655, "2AG": 4372, "2AK": 6687, "2AR": 5330, "2BG": 5316, "2BK": null, "2BR": 6751, "3AG": 1939, "3AK": null, "3AR": 3746, "3BG": 2152, "3BK": 6597, "3BR": 3672, "GM": 1543, "GMK": 6532, "GMR": 3664, "S1G": 27293, "S1K": null, "S1R": 30508, "S2G": 18160, "S2K": 24324, "S2R": 27455, "S3G": 12961, "S3R": 18351, "S4G": 27444, "STG": 11692, "STK": null, "STR": 11857}, "B.TECH IN COMPUTER SCIENCE AND ENGINEERING": {"1G": 3187, "1K": null, "1R": 4114, "2AG": 3189, "2AK": 7159, "2AR": 4359, "2BG": 5343, "2BK": 13186, "2BR": 8612, "3AG": 1810, "3AK": 8274, "3AR": 3470, "3BG": 1797, "3BK": 7561, "3BR": 3228, "GM": 1087, "GMK": 5908, "GMR": 2859, "S1G": 23527, "S1K": 41182, "S1R": 41728, "S2G": 17335, "S2K": 42057, "S2R": 21970, "S3G": 10619, "S3R": 20293, "S4G": 17850, "STG": 9665, "STK": null, "STR": 11366}, "B.TECH IN ELECTRICAL & ELECTRONICS ENGINEERING": {"1G": null, "1K": null, "1R": null, "2AG": 14639, "2AK": null, "2AR": null, "2BG": 18762, "2BK": null, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": 16617, "3BK": null, "3BR": null, "GM": 6170, "GMK": 39315, "GMR": 17509, "S1G": 50264, "S1K": null, "S1R": null, "S2G": 40745, "S2K": null, "S2R": null, "S3G": 43762, "S3R": null, "S4G": null, "STG": null, "STK": null, "STR": 101181}, "B.TECH IN ELECTRONICS & COMMUNICATION ENGINEERING": {"1G": 6985, "1K": null, "1R": 11164, "2AG": 5435, "2AK": 14208, "2AR": 11327, "2BG": 9656, "2BK": null, "2BR": 10283, "3AG": 2109, "3AK": null, "3AR": 6680, "3BG": 3680, "3BK": null, "3BR": 6537, "GM": 1881, "GMK": 7046, "GMR": 6003, "S1G": 28013, "S1K": 77161, "S1R": 36533, "S2G": 20562, "S2K": null, "S2R": 25999, "S3G": 21503, "S3R": 27089, "S4G": 200208, "STG": 12077, "STK": 28518, "STR": null}, "B.TECH IN MECHANICAL ENGINEERING": {"1G": 20040, "1K": null, "1R": null, "2AG": 14201, "2AK": null, "2AR": 35211, "2BG": 16919, "2BK": null, "2BR": null, "3AG": 10174, "3AK": null, "3AR": 31454, "3BG": 13268, "3BK": null, "3BR": null, "GM": 8504, "GMK": null, "GMR": 20606, "S1G": 78869, "S1K": null, "S1R": null, "S2G": 44149, "S2K": null, "S2R": null, "S3G": 189956, "S3R": null, "S4G": null, "STG": null, "STK": null, "STR": null}}, "BMSCE": {"ARTIFICIAL INTELLIGENCE AND DATA SCIENCE": {"GM": 4091, "GMK": 9259, "GMR": 7568, "1G": 9538, "2AG": 7039, "2BG": 8126, "3AG": 4977, "3BG": 4941, "SCG": 29532, "STG": 16692}, "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING": {"GM": 4140, "GMK": 8348, "GMR": 6904, "1G": 9991, "2AG": 7822, "2BG": 7908, "3AG": 5005, "3BG": 5074, "SCG": 27099, "STG": 15125}, "BIO-TECHNOLOGY": {"GM": 11825, "GMK": 45488, "GMR": 20888, "1G": 22854, "2AG": 19860, "2BG": 23456, "3AG": 14537, "3BG": 23689, "SCG": 69523, "STG": null}, "CHEMICAL ENGINEERING": {"GM": 15099, "GMK": 47155, "GMR": 30296, "1G": 34899, "2AG": 25825, "2BG": 33375, "3AG": 15814, "3BG": 24198, "SCG": 60084, "STG": 216210}, "CIVIL ENGINEERING": {"GM": 30006, "GMK": 41184, "GMR": 37524, "1G": 38046, "2AG": 31403, "2BG": 31289, "3AG": 30375, "3BG": 30769, "SCG": 53474, "STG": null}, "COMPUTER SCIENCE AND BUSINESS SYSTEMS": {"GM": 4980, "GMK": 15253, "GMR": 8774, "1G": 10170, "2AG": 10983, "2BG": 16085, "3AG": 5699, "3BG": 5401, "SCG": 47958, "STG": 101336}, "CS & ENGG(IOT CYBER SECURITY & BLOCKCHAIN)": {"GM": 4008, "GMK": 13176, "GMR": 6544, "1G": 9796, "2AG": 8389, "2BG": 10415, "3AG": 5161, "3BG": 5194, "SCG": 38831, "STG": null}, "COMPUTER SCIENCE AND ENGINEERING": {"GM": 3168, "GMK": 9084, "GMR": 5747, "1G": 7578, "2AG": 6542, "2BG": 9252, "3AG": 4067, "3BG": 4358, "SCG": 30811, "STG": 13819}, "COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)": {"GM": 4013, "GMK": 9486, "GMR": 6847, "1G": 7917, "2AG": 7496, "2BG": 7050, "3AG": 4023, "3BG": 4888, "SCG": 33157, "STG": 16205}, "ELECTRONICS AND COMMUNICATION ENGG": {"GM": 2800, "GMK": 10627, "GMR": 6817, "1G": 7156, "2AG": 7284, "2BG": 10932, "3AG": 4392, "3BG": 4029, "SCG": 43014, "STG": 14920}, "MECHANICAL ENGINEERING": {"GM": 14097.9, "GMK": 54794, "GMR": 37792, "1G": 25262, "2AG": 22509, "2BG": 35433, "3AG": 18903, "3BG": 18903, "SCG": 105501, "STG": null}}};

const COLLEGE_META = {
  MSRIT: { full: "M S Ramaiah Institute of Technology", code: "E006" },
  RVCE: { full: "R. V. College of Engineering", code: "E005" },
  PES: { full: "PES University", code: "E009" },
  BMSCE: { full: "B.M.S. College of Engineering", code: "E003" },
};

const CATEGORY_LABELS = {
  "1G": "1G — Category 1 General", "1K": "1K — Cat 1 Kannada", "1R": "1R — Cat 1 Rural",
  "2AG": "2AG — Cat 2A General", "2AK": "2AK — Cat 2A Kannada", "2AR": "2AR — Cat 2A Rural",
  "2BG": "2BG — Cat 2B General", "2BK": "2BK — Cat 2B Kannada", "2BR": "2BR — Cat 2B Rural",
  "3AG": "3AG — Cat 3A General", "3AK": "3AK — Cat 3A Kannada", "3AR": "3AR — Cat 3A Rural",
  "3BG": "3BG — Cat 3B General", "3BK": "3BK — Cat 3B Kannada", "3BR": "3BR — Cat 3B Rural",
  GM: "GM — General Merit", GMK: "GMK — General Merit Kannada", GMR: "GMR — General Merit Rural",
  S1G: "S1G — Sports Cat1 Gen", S1K: "S1K — Sports Cat1 Kan", S1R: "S1R — Sports Cat1 Rural",
  S2G: "S2G — Sports Cat2 Gen", S2K: "S2K — Sports Cat2 Kan", S2R: "S2R — Sports Cat2 Rural",
  S3G: "S3G — Sports Cat3 Gen", S3R: "S3R — Sports Cat3 Rural",
  S4G: "S4G — Sports Cat4 Gen",
  STG: "STG — Sports Tie Gen", STK: "STK — Sports Tie Kan", STR: "STR — Sports Tie Rural",
  SCG: "SCG — College Quota Gen",
};

function verdictFor(margin) {
  if (margin >= 15) return { tier: "Guaranteed", key: "guaranteed", prob: Math.min(99, 90 + (margin - 15) * 0.3) };
  if (margin >= 5) return { tier: "Realistic Chance", key: "realistic", prob: 70 + ((margin - 5) / 10) * 24 };
  if (margin >= -5) return { tier: "Borderline", key: "borderline", prob: 40 + ((margin + 5) / 10) * 20 };
  if (margin >= -20) return { tier: "Slim Chance", key: "slim", prob: 10 + ((margin + 20) / 15) * 25 };
  return { tier: "Not Possible", key: "impossible", prob: Math.max(0.5, 5 + margin / 10) };
}

const VERDICT_STYLE = {
  guaranteed: { bg: "#eaf4ec", border: "#2d6a4f", text: "#1e4a37", accent: "#2d6a4f" },
  realistic: { bg: "#f1f6e4", border: "#74a12e", text: "#4d6b1f", accent: "#74a12e" },
  borderline: { bg: "#fbf1de", border: "#c99a2e", text: "#8a681f", accent: "#c99a2e" },
  slim: { bg: "#fbe9e0", border: "#d16b3f", text: "#973f24", accent: "#d16b3f" },
  impossible: { bg: "#f7e2df", border: "#b3402f", text: "#7a2a1e", accent: "#b3402f" },
};

function fmt(n) {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("en-IN");
}

function ResultCard({ college, branch, category, rank }) {
  const cutoff = RAW_DATA[college]?.[branch]?.[category];
  if (cutoff === undefined) return null;

  if (cutoff === null) {
    return (
      <div style={{
        border: "1px solid #d8d2c2", borderLeft: "5px solid #9a9284", background: "#f4f1ea",
        borderRadius: 4, padding: "18px 20px", fontFamily: "'IBM Plex Mono', monospace",
      }}>
        <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: 15, color: "#5b5648", marginBottom: 4 }}>
          {COLLEGE_META[college].full} · {branch}
        </div>
        <div style={{ fontSize: 13, color: "#7a745f" }}>
          No Round 3 allotment recorded for <b>{category}</b> in this branch. This category may not have seats here, or none were filled this round.
        </div>
      </div>
    );
  }

  const margin = ((cutoff - rank) / cutoff) * 100;
  const v = verdictFor(margin);
  const s = VERDICT_STYLE[v.key];
  const prob = Math.max(0.5, Math.min(99, v.prob)).toFixed(0);

  // gauge position: clamp margin between -40 and +40 for display, map to 0-100%
  const clamped = Math.max(-40, Math.min(40, margin));
  const gaugePct = ((clamped + 40) / 80) * 100;

  return (
    <div style={{
      border: `1px solid ${s.border}55`, borderLeft: `6px solid ${s.border}`, background: s.bg,
      borderRadius: 4, padding: "22px 24px", transition: "all 0.2s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: 16, fontWeight: 600, color: "#2a2620" }}>
          {COLLEGE_META[college].full}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, color: "#8a8472", textTransform: "uppercase" }}>
          {COLLEGE_META[college].code}
        </div>
      </div>
      <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: 13, color: "#5b5648", marginTop: 2, marginBottom: 16 }}>
        {branch}
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>Your Rank</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: "#2a2620" }}>{fmt(rank)}</div>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, color: "#b3ab94", paddingBottom: 4 }}>vs</div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>R3 Cutoff ({category})</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: "#2a2620" }}>{fmt(cutoff)}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>Margin</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 600, color: margin >= 0 ? s.accent : s.accent }}>
            {margin >= 0 ? "+" : ""}{margin.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Gauge */}
      <div style={{ position: "relative", height: 8, background: "#e4ddc9", borderRadius: 4, marginBottom: 6 }}>
        <div style={{ position: "absolute", left: "50%", top: -3, bottom: -3, width: 2, background: "#2a2620aa" }} />
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: `${gaugePct}%`,
          background: s.accent, borderRadius: 4, transition: "width 0.3s",
        }} />
        <div style={{
          position: "absolute", left: `calc(${gaugePct}% - 5px)`, top: -4, width: 12, height: 16,
          background: s.accent, borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#9a9484", marginBottom: 18 }}>
        <span>WORSE THAN CUTOFF</span>
        <span>CUTOFF LINE</span>
        <span>BETTER THAN CUTOFF</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          display: "inline-block", padding: "6px 14px", borderRadius: 3, background: s.accent,
          color: "#fff", fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 700, fontSize: 15,
        }}>
          {v.tier}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: s.text }}>
          Estimated probability: <b>{prob}%</b>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ college, branch, category, rank }) {
  const cutoff = RAW_DATA[college]?.[branch]?.[category];
  const s = cutoff == null ? { bg: "#f4f1ea", accent: "#9a9284", text: "#7a745f" } :
    VERDICT_STYLE[verdictFor(((cutoff - rank) / cutoff) * 100).key];
  const v = cutoff == null ? null : verdictFor(((cutoff - rank) / cutoff) * 100);

  return (
    <div style={{
      border: `1px solid ${s.border || "#d8d2c2"}55`, borderTop: `4px solid ${s.accent}`,
      background: s.bg, borderRadius: 4, padding: "16px 16px", flex: "1 1 200px", minWidth: 180,
    }}>
      <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 700, fontSize: 14, color: "#2a2620", marginBottom: 8 }}>
        {college}
      </div>
      {cutoff == null ? (
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#7a745f" }}>No data</div>
      ) : (
        <>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#8a8472", marginBottom: 2 }}>
            Cutoff: {fmt(cutoff)}
          </div>
          <div style={{
            fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 700, fontSize: 13,
            color: s.accent, marginTop: 6,
          }}>
            {v.tier}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: s.text }}>
            {Math.max(0.5, Math.min(99, v.prob)).toFixed(0)}% chance
          </div>
        </>
      )}
    </div>
  );
}

export default function SurvivalBoard() {
  const [college, setCollege] = useState("MSRIT");
  const [branch, setBranch] = useState("COMPUTER SCIENCE AND ENGINEERING");
  const [category, setCategory] = useState("GM");
  const [rankInput, setRankInput] = useState("3200");
  const [compareMode, setCompareMode] = useState(false);

  const branches = useMemo(() => Object.keys(RAW_DATA[college] || {}).sort(), [college]);
  const categories = useMemo(() => {
    const b = RAW_DATA[college]?.[branch];
    return b ? Object.keys(b) : [];
  }, [college, branch]);

  React.useEffect(() => {
    if (!branches.includes(branch)) setBranch(branches[0] || "");
  }, [college]);
  React.useEffect(() => {
    if (!categories.includes(category)) setCategory(categories[0] || "");
  }, [branch, college]);

  const rank = parseInt(rankInput, 10);
  const rankValid = !isNaN(rank) && rank > 0;

  // suggestions when not possible
  const suggestions = useMemo(() => {
    if (!rankValid) return [];
    const cur = RAW_DATA[college]?.[branch]?.[category];
    const curVerdict = cur != null ? verdictFor(((cur - rank) / cur) * 100).key : null;
    if (curVerdict !== "impossible" && curVerdict !== "slim" && curVerdict !== null) return [];
    const opts = [];
    for (const b of branches) {
      if (b === branch) continue;
      const c = RAW_DATA[college][b][category];
      if (c == null) continue;
      const m = ((c - rank) / c) * 100;
      const vt = verdictFor(m);
      if (vt.key === "guaranteed" || vt.key === "realistic") {
        opts.push({ branch: b, cutoff: c, tier: vt.tier });
      }
    }
    return opts.slice(0, 3);
  }, [college, branch, category, rank, rankValid, branches]);

  return (
    <div style={{
      fontFamily: "'Source Serif Pro', Georgia, serif", background: "#f7f4ea", minHeight: "100vh",
      padding: "32px 16px", color: "#2a2620",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        select, input { font-family: 'IBM Plex Mono', monospace; }
        select:focus, input:focus { outline: 2px solid #1a2332; outline-offset: 1px; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ borderBottom: "3px double #1a2332", paddingBottom: 16, marginBottom: 28 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#8a8472", textTransform: "uppercase", marginBottom: 6 }}>
            KCET 2026 · Round 3 Predicted Cutoffs
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: -0.3 }}>Survival Board</h1>
          <div style={{ fontSize: 14, color: "#5b5648", marginTop: 4, fontStyle: "italic" }}>
            Check your rank against Round 3 predicted cutoffs — RVCE, MSRIT, PES, BMSCE
          </div>
        </div>

        {/* Input panel */}
        <div style={{
          background: "#fff", border: "1px solid #ddd6c4", borderRadius: 6, padding: "22px 24px", marginBottom: 24,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            <Field label="College">
              <select value={college} onChange={e => setCollege(e.target.value)} style={selStyle}>
                {Object.keys(RAW_DATA).map(c => <option key={c} value={c}>{c} — {COLLEGE_META[c].full}</option>)}
              </select>
            </Field>
            <Field label="Branch">
              <select value={branch} onChange={e => setBranch(e.target.value)} style={selStyle}>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Category">
              <select value={category} onChange={e => setCategory(e.target.value)} style={selStyle}>
                {categories.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c] || c}</option>)}
              </select>
            </Field>
            <Field label="Your KCET Rank">
              <input
                type="number" value={rankInput} onChange={e => setRankInput(e.target.value)}
                placeholder="e.g. 3200" style={selStyle}
              />
            </Field>
          </div>

          <label style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 18,
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#5b5648", cursor: "pointer",
          }}>
            <input type="checkbox" checked={compareMode} onChange={e => setCompareMode(e.target.checked)} />
            Compare this branch + category across all 4 colleges
          </label>
        </div>

        {/* Results */}
        {!rankValid ? (
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#8a8472", textAlign: "center", padding: 40 }}>
            Enter your KCET rank to see your board.
          </div>
        ) : compareMode ? (
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {Object.keys(RAW_DATA).map(c => (
              <MiniCard key={c} college={c} branch={branch} category={category} rank={rank} />
            ))}
          </div>
        ) : (
          <ResultCard college={college} branch={branch} category={category} rank={rank} />
        )}

        {/* Suggestions */}
        {rankValid && !compareMode && suggestions.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, color: "#8a8472", textTransform: "uppercase", marginBottom: 10 }}>
              You may also consider — same college, better odds
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {suggestions.map(s => (
                <div key={s.branch} style={{
                  background: "#eaf4ec", border: "1px solid #2d6a4f33", borderLeft: "4px solid #2d6a4f",
                  borderRadius: 4, padding: "12px 14px", flex: "1 1 220px",
                }}>
                  <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 600, fontSize: 13 }}>{s.branch}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#4d6b1f", marginTop: 4 }}>
                    Cutoff {fmt(s.cutoff)} · {s.tier}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: 40, paddingTop: 16, borderTop: "1px solid #ddd6c4",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#9a9484", lineHeight: 1.6,
        }}>
          Verdict bands are calculated from a single Round 3 snapshot (margin between your rank and the cutoff), not multi-round trend data — treat probabilities as directional, not exact. "—" means that category had no recorded Round 3 allotment for that branch.
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1, color: "#8a8472", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

const selStyle = {
  width: "100%", padding: "9px 10px", border: "1px solid #ccc4ac", borderRadius: 4,
  background: "#fdfcf8", fontSize: 13, color: "#2a2620",
};
