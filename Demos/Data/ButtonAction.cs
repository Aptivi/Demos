using System;
using Microsoft.AspNetCore.Components;

namespace Demos.Data
{
    public class ButtonAction
    {
        public EventCallback Callback { get; }
        public string Label { get; } = "Unlabeled Button";
        public bool Disabled { get; }

        public ButtonAction(object context, Action callback, string label) :
            this(context, callback, label, false)
        { }

        public ButtonAction(object context, Action callback, string label, bool disabled)
        {
            Callback = EventCallback.Factory.Create(context, callback);
            Label = label;
            Disabled = disabled;
        }
    }
}
