<div
            className={`w-full h-full rounded-lg overflow-hidden transition-all duration-300 
            shadow-[0_0_15px_rgba(var(--shadow-color),0.1)] hover:shadow-[0_0_20px_rgba(var(--shadow-color),0.15)]`}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
        >
            {isDragging ? (
                <div className="max-h-[50px] justify-center flex items-center bg-primary/10 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                    <PlusCircle className="mr-2" /> 拖拽文件到这里上传
                </div>
            ) : (
                files &&
                files.length > 0 && (
                    <div className="w-full flex items-center px-4 py-4 gap-4 overflow-x-auto">
                        {files.map((file, index) => (
                            <FileCard
                                key={index}
                                fileData={file}
                                onDelete={() => {
                                    removeFile(file.id)
                                }}
                            />
                        ))}
                    </div>
                )
            )}



            <div className="p-2 w-full">
                <Textarea
                    placeholder="在这里输入您的问题..."
                    value={value}
                    rows={value?.split('\n').length>5?5:value?.split('\n').length}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    onPaste={handlePaste}
                    onChange={(e) => {
                        onValueChange(e.target.value)
                    }}
                    className="border-0 w-full shadow-none focus-visible:ring-0 resize-none text-base"
                />
            </div>
            <div className="p-2 flex justify-between">
                <div className={'flex gap-2 pl-2'}>
                    <Button size={'icon'} variant={'ghost'} onClick={handlePaperclipClick}>
                        <Paperclip />
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                        accept="image/*,.pdf"
                        multiple
                    />


                    <TipButton
                        // isActive={mindMap}
                        className={`rounded-full  ${
                            mindMap ? "bg-primary/90" : "bg-transparent text-secondary-foreground/30"
                        }`}
                        size={'icon'}
                        onClick={toggleMindMap}
                        icon={<Sprout  />}
                        tooltipText="Mind Map Guidance"
                    />
                    <TipButton
                        // isActive={AISearch}
                        onClick={toggleAISearch}
                        size={'icon'}
                        className={`rounded-full hover:bg-primary/50 ${
                            AISearch ? "bg-primary/90" : "bg-transparent text-secondary-foreground/30"
                        }`}
                        icon={<Globe  />}
                        tooltipText="Web Search"
                    />


                </div>

                <Button
                    // variant="ghost"
                    variant={'outline'}
                    size="icon"
                    disabled={!value.trim() && !loading}
                    onClick={loading ? abortRequest : handleSubmit}
                    className={`mr-2 ${loading?'rounded-full bg-primary  hover:bg-primary/80':'bg-transparent  hover:bg-gray-100 text-gray-700'}`}
                >
                    {loading ? <Square className="w-6 h-6 text-primary-foreground" /> : <SendHorizontal className="!w-6 !h-6" />}
                </Button>
            </div>
        </div>
