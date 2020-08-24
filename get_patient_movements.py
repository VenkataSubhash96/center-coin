import MySQLdb
import re
import sys
import time

db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                     user="jnana",         # your username
                     passwd="Access@0052",  # your password
                     db="patient_sleep")        # name of the data base

cur = db.cursor()
cur.execute("SELECT DISTINCT PatientName FROM patient_sleep")
unique_patients = []
for row in cur:
	unique_patients.append(row[0])

#input_ = "How many times did john move between 8AM and 10PM"
if len(sys.argv)<2:
	print('Please enter the free text query')
else:
	input_ = sys.argv[1]

	fetched_patient_name = ''
	for db_patient_name in unique_patients:
		if db_patient_name.lower() in input_.lower().split(' '):
			fetched_patient_name = db_patient_name
	if fetched_patient_name !='':
		print("Fetchng details for: ", fetched_patient_name)
		time.sleep(1)
		start_time_hour = -1
		end_time_hour= -1
		#fetch times 
		am_pos = [m.start() for m in re.finditer('AM', input_)]
		pm_pos = [m.start() for m in re.finditer('PM', input_)]	
		#print("pm_pos", pm_pos)
		
		if len(am_pos)<2 and len(pm_pos)<2 and len(am_pos)+len(pm_pos)<2:
			print('Failed to understand input query, please try again')
		else:
			if len(am_pos)==1: #query spans between am and pm, check for start pos and end pos
				if am_pos[0]<pm_pos[0]: #am is start and pm is end
					start_time_hour = int(input_[am_pos[0]-3:am_pos[0]].strip())
					end_time_hour = int(input_[pm_pos[0]-3:pm_pos[0]].strip())
					if end_time_hour<12:
				    		end_time_hour=end_time_hour+12
					if end_time_hour>24:
				    		end_time_hour=23
				else:
					start_time_hour = int(input_[pm_pos[0]-3:pm_pos[0]].strip())
					if start_time_hour<12:
				    		start_time_hour=start_time_hour+12
					if start_time_hour>24:
				    		start_time_hour=23
				    
					end_time_hour = int(input_[am_pos[0]-3:am_pos[0]].strip())

			else:
				if len(am_pos)==2:
					start_time_hour = int(input_[am_pos[0]-3:am_pos[0]].strip())
					end_time_hour = int(input_[am_pos[1]-3:am_pos[1]].strip())
				else:
					#both PM
					start_time_hour = int(input_[pm_pos[0]-2:pm_pos[0]].strip())
					end_time_hour = int(input_[pm_pos[1]-2:pm_pos[1]].strip())
					
					if start_time_hour<12:
						start_time_hour=start_time_hour+12
					if start_time_hour>24:
						start_time_hour=23
					    
					if end_time_hour<12:
						end_time_hour=end_time_hour+12
					if end_time_hour>24:
						end_time_hour=23
			
			if (start_time_hour>23 or start_time_hour<0) or (end_time_hour>23 or end_time_hour<0):
				print("Failed to get the time info from the query. Please try again")
			else:
				#fetch from DB
				#inputs - fetched_patient_name, start_time_hour, end_time_hour
				cur.execute("SELECT * FROM patient_sleep WHERE PatientName = %s and HOUR(time) between %s and %s ",(fetched_patient_name,start_time_hour,end_time_hour,))
				len_list = []
				for ele in cur: len_list.append(ele)
				print('Total movements for ',fetched_patient_name,' between ',str(start_time_hour)+':00',' and ',str(end_time_hour)+':00',': ', len(len_list))
				if len(len_list)<6:
					print('Too few movements. Not a healthy sleep')
			
	else:
		print('Patient info not found in the records')

