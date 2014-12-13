<div class="formgen">
    <label class="formgen_label">{{label}}</label>
    <div class="formgen_inputs">
        {{{field}}}
        {{#if star}}
            <span class="formgen_star">*</span>
        {{/if}}
        {{#if tip}}
            <span class="formgen_tip">{{tip}}</span>
        {{/if}}
        {{#if msg}}
            <p class="formgen_msg"></p>
        {{/if}}
    </div>
</div>
