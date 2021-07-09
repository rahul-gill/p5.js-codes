>Based on Computer Networking: A top down approach

## events:  
 * three ACKs(duplicate 3 ACKs for same message)
 * timeout(ACK didn't received in time)
## states:  
 * slow start(not really slow,increase bandwidth exponentially) 
 * congestion avoidance
 * fast recovery
### vars:
 *  **CWND:** congestion windows size. Denotes number of packets that can be sent, avoiding congestion<br>
 *  **SSTHESH:** slow start threshold. It is the threshold bandwidth at which congestion avoidance is switched on
 (equal to half of CWND when timeout or threeACKs occured in slow start mode)
 * **MSS:** maximum segment size(precisely its number of bytes application layer pass to TCP)
 * **T:** ACK number(similar to time frame)

# Events
 - ## three ACKs:  
    - take TCP segments with numbers 0 1 2 3 4 5 6 7 8 9 10
    - if sender send these one by one, and segment 2 get lost
    then receiver will send back ACK message with ACK no 1 for
    further received segments(3,4,...) until arrival of 2nd 
    segment. So the ACK numbers received by sender are 0 1 1 1 1
    - now three duplicate ACKs arrived and sender knows
    segment 2 get lost(google why three duplicates and not two)
  - ## timeout:
    - happens when sender has waited enough for ACK(time up)
    - Denotes more serious congestion than three ACKs
 # States
 - ## SlowStart:
    - if no threeACKs or timeout and CWND < SSTHRESH: exponentially increase congestion window(double each time like 1 2 4 8 16)
    - if no threeACKs or timeout and CWND >= SSTHRESH:half the threshold(SSTHESH) and switch mode to CongestionAvoidance 
    - if timeout happens: set congestion window to 1MSS
    - if threeACKs happens:make SSTHRESH half of current
     windows size,make CWND equals to SSTHESH and switch to FastRecovery mode
 - ## CongestionAvoidance:
    - if no threeACKs or timeout: increase CWND after every (CWND/MSS) number of received ACKs
    - if(timeout): make SSTHRESH half the current windows size, make CWND = 1 and switch to SlowStart
 - ## FastRecovery:
    - if(threeACKs): CWND++;
    - f(no threeACKs or timeout): switch to Congestion Avoidance
    - if(timeout):  SSTHRESH = current CWND/2;CWND = 1; switch to SlowStart
 