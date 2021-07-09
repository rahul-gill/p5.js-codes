## events:  
 * three ACKs(duplicate 3 ACKs for same message)
 * timeout(ACK didn't received in time)
## states:  
 * slow start(not really slow,increase bandwidth exponentially) 
 * congestion avoidance
 * fast recovery
### vars:
 *  **cwnd:** congestion windows size<br>
 *  **ssthresh:** threshold bandwidth at which congestion avoidance is switched on
 * **mss:** maximum segment size
 * **t:** ACK number(similar to time frame)

# Explanation of states
 ## three ACKs:  
 ``take TCP segments with numbers 0 1 2 3 4 5 6 7 8 9 10``
 
 ```if sender send these one by one, and segment 2 get lost
 then receiver will send back ACK message with ACK no 1 for 
 further received segments(3,4,...) until arrival of 2nd
  segment.So the ACK numbers received by sender are 0 1 1 1```
```now three duplicate ACKs arrived and sender knows
 segment 2 get lost(google why three duplicates and not two)```
 * timeout:
 *      happens when sender has waited enough for ACK. Denotes more serious congestion than three ACKs
 * 
 * MSS: max segment size(precisely its number of bytes application layer pass to TCP)
 * CWND: congestion window(number of packets that can be sent, avoiding congestion)
 * SSTHRESH: slow start threshold(equal to half of CWND when timeout or threeACKs occured in slow start mode)
 * 
 * SlowStart:
 *      if(no threeACKs or timeout && CWND < SSTHRESH): exponentially increase congestion window(double each time like 1 2 4 8 16)
 *      if(no threeACKs or timeout && CWND >= SSTHRESH):SSTHRESH = CWND/2;switch mode to CongestionAvoidance 
 *      if(timeout): set congestion window to 1MSS
 *      if(threeACKs): SSTHRESH = current CWND/2;CWND = SSTHRESH;switch mode to FastRecovery
 * CongestionAvoidance:
 *      if(no threeACKs or timeout): increase CWND every CWND/MSS received ACKs
 *      if(timeout): SSTHRESH = current CWND/2;CWND = 1; switch to SlowStart
 * FastRecovery:
 *      if(threeACKs): CWND++;
 *      if(no threeACKs or timeout): switch to CongestionAvoidance
 if(timeout):  SSTHRESH = current CWND/2;CWND = 1; switch to SlowStart
 