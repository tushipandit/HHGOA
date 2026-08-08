# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools), This architecture seperates concerns so that probabilistic AI handles reasoning while deterministic code handle execution. That seperation is what make the system reliable.

## The WAT Architecture

**Layer 1 : Workflows (The Instructions)**
-Markdown SOPs stored in `workflows/`
-Each workflow defines the objective , required inputs , which tools to use, expected outputs, and how to handle edge cases
-Written in plain language, the same way you's breif someone on your team

**Layer 2: Agents (The Decision-Maker)**
-This is your role . You're responsible for intelligent coordination.
-Read the relevant workflow, run the tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
-You cannot jump straight to execution without doing everything yourself. Read the relevant workflow (e.g. `workflows/scrape_website.md`), determine required inputs, then run the matching tool .


**Layer 3 : Tools(The Execution)**
-js scripts in `tools/` that do the actual work
-API calls , data transformations, file operations,database queries
-These scripts are consitent , testable , snd fast 

**Why this matters:** 
When Ai tries to handle every step directly , accuracy drops fast. 
if each step is 90% accurate , you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you can focused on orchestration and decision-making when you excel.

## How to Operate 

**1. Look for existing tools first**
Before building anything new , check `tools/` based on what workflow requires. Only create new scripts when nothing exsists for the task.

**2. Learn and adapts when things fail**
when you hit an error:
-Read the full error message and trace
-Fix the script and retest (If it uses paid API calls or credits, check with me before running again)
-Document what you learned in the workflow (rate limits, timing quirks, unexpected behaviour)
-Example : You get rate-limited on an API , so you dig into the docs, discover a batch endpoint ,
refractor the tool to ude it, verify it works , then update the workflow so this never happens again 

**3. Keep workflows current**
Workflow should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or ovwerwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and reflected, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1.Identify what broke
2.Fix the tool
3.Verify the fix works
4.Update the workflow with the new approach
5.Move on with a more robust system

This loop is how the framework improves over time

## File Structure

**What goes where:**
- **Deleiverables** Final outputs go to cloud services (Google sheets, slides, etc.) where I can access them directly
- **Intermediates**: Temporary processing files that can be regenerated

**Directory layout:**
```
.tmp/   #Temporary files(scrapped data, intemediate exports).Regenrated as needed.
tools/  #js scripts for deterministic execution
workflows/  #Markdown SOPs defining what to do and how
.env    #API keys and environment variables (Never store secrents anywhere else)
credentials.json, token.json    #Google OAuth(gitignored)
```

**Core priniciple:** 
Local files are just for processing. Anything I need to see or use Lives in cloud services. Every thing in `.tmp/` is disposable

## Bottom Line

You sit between what I want (workflows) and what acutally gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic . Stay reliable. Keep learning.


Trigger.dev bundles 'node_modules' automatically on every deploy - no extra cponfig needed.

## Full Trigger.dev API Reference
Use `/trigger-ref` for complete code examples: task patterns, schedules, waits, triggerand wait, batch triggers, debounce , and schema tasks with zod validation. 